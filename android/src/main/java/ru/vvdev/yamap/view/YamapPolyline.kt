package ru.vvdev.yamap.view

import android.content.Context
import android.graphics.Color
import android.view.ViewGroup
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.UIManagerHelper
import com.facebook.react.uimanager.UIManagerHelper.getSurfaceId
import com.yandex.mapkit.geometry.Point
import com.yandex.mapkit.geometry.Polyline
import com.yandex.mapkit.map.LineStyle
import com.yandex.mapkit.map.MapObject
import com.yandex.mapkit.map.MapObjectTapListener
import com.yandex.mapkit.map.PolylineMapObject
import ru.vvdev.yamap.events.YamapPolylinePressEvent
import ru.vvdev.yamap.models.ReactMapObject

class YamapPolyline(context: Context?) : ViewGroup(context), MapObjectTapListener, ReactMapObject {
    @JvmField
    var polyline: Polyline
    private var _points: ArrayList<Point> = ArrayList()
    override var rnMapObject: MapObject? = null
    private var _outlineColor = Color.BLACK
    private var _strokeColor = Color.BLACK
    private var _zIndex = 1
    private var _strokeWidth = 1f
    private var _dashLength = 1
    private var _gapLength = 0
    private var _dashOffset = 0f
    private var _outlineWidth = 0
    private var _handled = true

    init {
        polyline = Polyline(ArrayList())
    }

    override fun onLayout(changed: Boolean, l: Int, t: Int, r: Int, b: Int) {
    }

    // PROPS
    fun setPolygonPoints(points: ArrayList<Point>?) {
        _points = points ?: ArrayList()
        polyline = Polyline(_points)
        updatePolyline()
    }

    fun setZIndex(zIndex: Int) {
        _zIndex = zIndex
        updatePolyline()
    }

    fun setStrokeColor(color: Int) {
        _strokeColor = color
        updatePolyline()
    }

    fun setDashLength(dashLength: Int) {
        _dashLength = dashLength
        updatePolyline()
    }

    fun setDashOffset(offset: Float) {
        _dashOffset = offset
        updatePolyline()
    }

    fun setGapLength(gapLength: Int) {
        _gapLength = gapLength
        updatePolyline()
    }

    fun setOutlineWidth(width: Int) {
        _outlineWidth = width
        updatePolyline()
    }

    fun setOutlineColor(color: Int) {
        _outlineColor = color
        updatePolyline()
    }

    fun setStrokeWidth(width: Float) {
        _strokeWidth = width
        updatePolyline()
    }

    private fun updatePolyline() {
        if (rnMapObject === null) return

        val style = LineStyle()
        style.strokeWidth = _strokeWidth
        style.dashLength = _dashLength.toFloat()
        style.gapLength = _gapLength.toFloat()
        style.dashOffset = _dashOffset
        style.outlineColor = _outlineColor
        style.outlineWidth = _outlineWidth.toFloat()
        (rnMapObject as PolylineMapObject).style = style

        (rnMapObject as PolylineMapObject).geometry = polyline
        (rnMapObject as PolylineMapObject).setStrokeColor(_strokeColor)
        (rnMapObject as PolylineMapObject).zIndex = _zIndex.toFloat()
    }

    fun setPolylineMapObject(obj: MapObject?) {
        rnMapObject = obj as PolylineMapObject?
        rnMapObject!!.addTapListener(this)
        updatePolyline()
    }

    fun setHandled(handled: Boolean) {
        _handled = handled
    }

    override fun onMapObjectTap(mapObject: MapObject, point: Point): Boolean {
        val eventDispatcher = UIManagerHelper.getEventDispatcherForReactTag(context as ThemedReactContext, id)
        eventDispatcher?.dispatchEvent(YamapPolylinePressEvent(getSurfaceId(context), id))

        return _handled
    }
}
