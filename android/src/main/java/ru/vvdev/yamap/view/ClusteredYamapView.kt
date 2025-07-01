package ru.vvdev.yamap.view

import android.content.Context
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.graphics.Rect
import android.graphics.Typeface
import android.util.Base64
import android.util.Log
import android.view.View
import com.yandex.mapkit.geometry.Point
import com.yandex.mapkit.map.Cluster
import com.yandex.mapkit.map.ClusterListener
import com.yandex.mapkit.map.ClusterTapListener
import com.yandex.mapkit.map.IconStyle
import com.yandex.mapkit.map.PlacemarkMapObject
import com.yandex.runtime.image.ImageProvider
import kotlin.math.abs
import kotlin.math.sqrt
import androidx.core.graphics.createBitmap
import com.facebook.react.bridge.ReadableMap
import ru.vvdev.yamap.utils.ImageCacheManager

class ClusteredYamapView(context: Context?) : YamapView(context), ClusterListener,
    ClusterTapListener {
    private val clusterCollection = mapWindow.map.mapObjects.addClusterizedPlacemarkCollection(this)
    private var clusterColor = 0
    private val placemarksMap = HashMap<String?, PlacemarkMapObject?>()
    private var pointsList = ArrayList<Point>()
    private var clusterIcon = ""
    private var clusterBitmap: Bitmap? = null
    private var clusterWidth = 32
    private var clusterHeight = 32
    private var clusterTextSize = Companion.FONT_SIZE
    private var clusterTextColor = Color.WHITE
    private var clusterTextXOffset = 0
    private var clusterTextYOffset = 0

    fun setClusterTextSize(size: Float) {
        clusterTextSize = size
    }

    fun setClusterTextColor(color: Int) {
        clusterTextColor = color
    }

    fun setClusterTextXOffset(offset: Int) {
        clusterTextXOffset = offset
    }

    fun setClusterTextYOffset(offset: Int) {
        clusterTextYOffset = offset
    }

    fun setClusteredMarkers(points: ArrayList<HashMap<String, Double>>) {
        clusterCollection.clear()
        placemarksMap.clear()
        val pt = ArrayList<Point>()
        for (i in points.indices) {
            val point = points[i]
            pt.add(Point(point["lat"]!!, point["lon"]!!))
        }
        val placemarks = clusterCollection.addPlacemarks(pt, TextImageProvider(""), IconStyle())
        pointsList = pt
        for (i in placemarks.indices) {
            val placemark = placemarks[i]
            placemarksMap["" + placemark.geometry.latitude + placemark.geometry.longitude] =
                placemark
            val child: Any? = getChildAt(i)
            if (child != null && child is YamapMarker) {
                child.setMarkerMapObject(placemark)
            }
        }

        clusterCollection.clusterPlacemarks(50.0, 12)
    }

    fun setClusterIcon(iconSource: String) {
        if (iconSource.startsWith("data:image")) {
            val pureBase64Encoded = iconSource.substring(iconSource.indexOf(",") + 1)
            val decodedString = Base64.decode(pureBase64Encoded, Base64.DEFAULT)
            clusterBitmap = BitmapFactory.decodeByteArray(decodedString, 0, decodedString.size)
        } else {
            clusterIcon = iconSource;
            ImageCacheManager.getImage(context, iconSource, fun(image: Bitmap?) {
                if (iconSource.equals(clusterIcon)) {
                    clusterBitmap = image
                }
            });
        }
    }

    fun setClusterSize(params: ReadableMap?) {
        clusterWidth =
            if (params != null && params.hasKey("width") && !params.isNull("width")) params.getInt("width") else clusterWidth;
        clusterHeight =
            if (params != null && params.hasKey("height") && !params.isNull("height")) params.getInt(
                "height"
            ) else clusterWidth;
    }

    fun setClustersColor(color: Int) {
        clusterColor = color
        updateUserMarkersColor()
    }

    private fun updateUserMarkersColor() {
        clusterCollection.clear()
        val placemarks = clusterCollection.addPlacemarks(
            pointsList,
            TextImageProvider(pointsList.size.toString()),
            IconStyle()
        )
        for (i in placemarks.indices) {
            val placemark = placemarks[i]
            placemarksMap["" + placemark.geometry.latitude + placemark.geometry.longitude] =
                placemark
            val child: Any? = getChildAt(i)
            if (child != null && child is YamapMarker) {
                child.setMarkerMapObject(placemark)
            }
        }
        clusterCollection.clusterPlacemarks(50.0, 12)
    }

    override fun addFeature(child: View?, index: Int) {
        val marker = child as YamapMarker?
        val placemark = placemarksMap["" + marker!!.point!!.latitude + marker.point!!.longitude]
        if (placemark != null) {
            marker.setMarkerMapObject(placemark)
        }
    }

    override fun removeChild(index: Int) {
        val child = getChildAt(index)
        if (child is YamapMarker) {
            val mapObject = child.rnMapObject
            if (mapObject == null || !mapObject.isValid) return
            clusterCollection.remove(mapObject)
            placemarksMap.remove("" + child.point!!.latitude + child.point!!.longitude)
        }
    }

    override fun onClusterAdded(cluster: Cluster) {
        cluster.appearance.setIcon(TextImageProvider(cluster.size.toString()))
        cluster.addClusterTapListener(this)
    }

    override fun onClusterTap(cluster: Cluster): Boolean {
        val points = ArrayList<Point>()
        for (placemark in cluster.placemarks) {
            points.add(placemark.geometry)
        }
        fitMarkers(points)
        return true
    }

    private inner class TextImageProvider(private val text: String) : ImageProvider() {
        override fun getId(): String {
            return "text_$text"
        }

        override fun getImage(): Bitmap {
            val textPaint = Paint()
            textPaint.textAlign = Paint.Align.CENTER
            textPaint.style = Paint.Style.FILL
            textPaint.isAntiAlias = true
            textPaint.textSize = clusterTextSize
            textPaint.color = clusterTextColor

            val textMetrics = textPaint.fontMetrics


            if (clusterBitmap != null && clusterWidth != 0 && clusterHeight != 0) {
                val bitmap = createBitmap(clusterWidth, clusterHeight);
                val canvas = Canvas(bitmap);

                canvas.drawBitmap(
                    clusterBitmap!!,
                    null,
                    Rect(0, 0, clusterWidth, clusterHeight),
                    null
                );

                val currentTypeFace = textPaint.getTypeface()
                val bold = Typeface.create(currentTypeFace, Typeface.BOLD)
                textPaint.setTypeface(bold);

                canvas.drawText(
                    text,
                    (clusterWidth / 2 + clusterTextXOffset).toFloat(),
                    (clusterHeight / 2 - (textMetrics.ascent + textMetrics.descent) / 2 + clusterTextYOffset).toFloat(),
                    textPaint
                );

                return bitmap
            } else {
                val widthF = textPaint.measureText(text)

                val heightF =
                    (abs(textMetrics.bottom.toDouble()) + abs(textMetrics.top.toDouble())).toFloat()
                val textRadius = sqrt((widthF * widthF + heightF * heightF).toDouble())
                    .toFloat() / 2
                val internalRadius = textRadius + Companion.MARGIN_SIZE
                val externalRadius = internalRadius + Companion.STROKE_SIZE

                val width = (2 * externalRadius + 0.5).toInt()

                val bitmap = createBitmap(width, width)
                val canvas = Canvas(bitmap)

                val backgroundPaint = Paint()
                backgroundPaint.isAntiAlias = true
                backgroundPaint.color = clusterColor
                canvas.drawCircle(
                    (width / 2).toFloat(),
                    (width / 2).toFloat(),
                    externalRadius,
                    backgroundPaint
                )

                backgroundPaint.color = Color.WHITE
                canvas.drawCircle(
                    (width / 2).toFloat(),
                    (width / 2).toFloat(),
                    internalRadius,
                    backgroundPaint
                )

                canvas.drawText(
                    text,
                    (width / 2).toFloat(),
                    width / 2 - (textMetrics.ascent + textMetrics.descent) / 2,
                    textPaint
                )

                return bitmap
            }
        }
    }

    companion object {
        private const val FONT_SIZE = 45f
        private const val MARGIN_SIZE = 9f
        private const val STROKE_SIZE = 9f
    }
}
