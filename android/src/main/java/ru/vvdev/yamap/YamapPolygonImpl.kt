package ru.vvdev.yamap

import com.facebook.react.bridge.ReadableArray
import com.yandex.mapkit.geometry.Point
import ru.vvdev.yamap.events.YamapPolygonPressEvent
import ru.vvdev.yamap.utils.PointUtil
import ru.vvdev.yamap.view.YamapPolygon

class YamapPolygonImpl() {

    fun getExportedCustomDirectEventTypeConstants() = mapOf(
        YamapPolygonPressEvent.EVENT_NAME to mapOf("registrationName" to "onPress")
    )

    // PROPS
    fun setPoints(view: YamapPolygon, jsPoints: ReadableArray?) {
        jsPoints?.let {
            val points = PointUtil.jsPointsToPoints(it)
            view.setPolygonPoints(points)
        }
    }

    fun setInnerRings(view: YamapPolygon, jsRings: ReadableArray?) {
        val rings = ArrayList<ArrayList<Point>>()
        jsRings?.let {
            for (j in 0 until it.size()) {
                val jsPoints = it.getArray(j) ?: return
                val points = PointUtil.jsPointsToPoints(jsPoints)
                rings.add(points)
            }
        }
        view.setPolygonInnerRings(rings)
    }

    fun setStrokeWidth(view: YamapPolygon, width: Float) {
        view.setStrokeWidth(width)
    }

    fun setStrokeColor(view: YamapPolygon, color: Int) {
        view.setStrokeColor(color)
    }

    fun setFillColor(view: YamapPolygon, color: Int) {
        view.setFillColor(color)
    }

    fun setZI(view: YamapPolygon, zIndex: Float) {
        view.setZIndex(zIndex)
    }

    fun setHandled(view: YamapPolygon, handled: Boolean) {
        view.setHandled(handled)
    }

    companion object {
        const val NAME = "YamapPolygon"
    }
}
