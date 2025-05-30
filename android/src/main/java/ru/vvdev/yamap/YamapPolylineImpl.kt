package ru.vvdev.yamap

import com.facebook.react.bridge.ReadableArray
import ru.vvdev.yamap.events.YamapPolylinePressEvent
import ru.vvdev.yamap.utils.PointUtil
import ru.vvdev.yamap.view.YamapPolyline

class YamapPolylineImpl() {

    fun getExportedCustomDirectEventTypeConstants() = mapOf(
        YamapPolylinePressEvent.EVENT_NAME to mapOf("registrationName" to "onPress")
    )

    // PROPS
    fun setPoints(view: YamapPolyline, jsPoints: ReadableArray?) {
        val points = jsPoints?.let { PointUtil.jsPointsToPoints(it) }
        view.setPolygonPoints(points)
    }

    fun setStrokeWidth(view: YamapPolyline, width: Float) {
        view.setStrokeWidth(width)
    }

    fun setStrokeColor(view: YamapPolyline, color: Int) {
        view.setStrokeColor(color)
    }

    fun setZI(view: YamapPolyline, zIndex: Float) {
        view.setZIndex(zIndex)
    }

    fun setDashLength(view: YamapPolyline, length: Float) {
        view.setDashLength(length)
    }

    fun setDashOffset(view: YamapPolyline, offset: Float) {
        view.setDashOffset(offset)
    }

    fun setGapLength(view: YamapPolyline, length: Float) {
        view.setGapLength(length)
    }

    fun setOutlineWidth(view: YamapPolyline, width: Float) {
        view.setOutlineWidth(width)
    }

    fun setOutlineColor(view: YamapPolyline, color: Int) {
        view.setOutlineColor(color)
    }

    fun setHandled(view: YamapPolyline, handled: Boolean) {
        view.setHandled(handled)
    }

    companion object {
        const val NAME = "YamapPolyline"
    }
}
