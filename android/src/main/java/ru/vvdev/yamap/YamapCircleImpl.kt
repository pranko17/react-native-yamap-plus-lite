package ru.vvdev.yamap

import com.facebook.react.bridge.ReadableMap
import ru.vvdev.yamap.events.YamapCirclePressEvent
import ru.vvdev.yamap.utils.PointUtil
import ru.vvdev.yamap.view.CircleView

class YamapCircleImpl() {

    fun getExportedCustomDirectEventTypeConstants() = mapOf(
        YamapCirclePressEvent.EVENT_NAME to mapOf("registrationName" to "onPress")
    )

    // PROPS
    fun setCenter(view: CircleView, center: ReadableMap?) {
        center?.let {
            val point = PointUtil.readableMapToPoint(it)
            view.setCenter(point)
        }
    }

    fun setRadius(view: CircleView, radius: Float) {
        view.setRadius(radius)
    }

    fun setStrokeWidth(view: CircleView, width: Float) {
        view.setStrokeWidth(width)
    }

    fun setStrokeColor(view: CircleView, color: Int) {
        view.setStrokeColor(color)
    }

    fun setFillColor(view: CircleView, color: Int) {
        view.setFillColor(color)
    }

    fun setZI(view: CircleView, zIndex: Float) {
        view.setZIndex(zIndex)
    }

    fun setHandled(view: CircleView, handled: Boolean) {
        view.setHandled(handled)
    }

    companion object {
        const val NAME = "YamapCircle"
    }
}
