package ru.vvdev.yamap.view

import com.facebook.react.bridge.ReadableArray
import com.yandex.mapkit.geometry.Point
import ru.vvdev.yamap.events.YamapPolygonPressEvent
import ru.vvdev.yamap.utils.PointUtil

class PolygonViewManagerImpl() {

    fun getExportedCustomDirectEventTypeConstants() = mapOf(
        YamapPolygonPressEvent.EVENT_NAME to mapOf("registrationName" to "onPress")
    )

    // PROPS
    fun setPoints(view: PolygonView, jsPoints: ReadableArray?) {
        jsPoints?.let {
            val points = PointUtil.jsPointsToPoints(it)
            view.setPolygonPoints(points)
        }
    }

    fun setInnerRings(view: PolygonView, jsRings: ReadableArray?) {
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

    fun setStrokeWidth(view: PolygonView, width: Float) {
        view.setStrokeWidth(width)
    }

    fun setStrokeColor(view: PolygonView, color: Int) {
        view.setStrokeColor(color)
    }

    fun setFillColor(view: PolygonView, color: Int) {
        view.setFillColor(color)
    }

    fun setZI(view: PolygonView, zIndex: Float) {
        view.setZIndex(zIndex)
    }

    fun setHandled(view: PolygonView, handled: Boolean) {
        view.setHandled(handled)
    }

    companion object {
        const val NAME = "YamapPolygon"
    }
}
