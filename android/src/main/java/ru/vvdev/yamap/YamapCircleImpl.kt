package ru.vvdev.yamap

import com.facebook.react.bridge.ReadableMap
import ru.vvdev.yamap.events.YamapCirclePressEvent
import ru.vvdev.yamap.utils.PointUtil
import ru.vvdev.yamap.view.YamapCircle

class YamapCircleImpl() {
    fun getExportedCustomDirectEventTypeConstants() = mapOf(
        YamapCirclePressEvent.EVENT_NAME to mapOf("registrationName" to "onPress")
    )

    // PROPS
    fun setCenter(view: YamapCircle, center: ReadableMap?) {
        center?.let {
            val point = PointUtil.readableMapToPoint(it)
            view.setCenter(point)
        }
    }

    fun setRadius(view: YamapCircle, radius: Float) {
        view.setRadius(radius)
    }

    fun setStrokeWidth(view: YamapCircle, width: Float) {
        view.setStrokeWidth(width)
    }

    fun setStrokeColor(view: YamapCircle, color: Int) {
        view.setStrokeColor(color)
    }

    fun setFillColor(view: YamapCircle, color: Int) {
        view.setFillColor(color)
    }

    fun setZI(view: YamapCircle, zIndex: Int) {
        view.setZIndex(zIndex)
    }

    fun setHandled(view: YamapCircle, handled: Boolean) {
        view.setHandled(handled)
    }

    companion object {
        const val NAME = "YamapCircle"
    }
}
