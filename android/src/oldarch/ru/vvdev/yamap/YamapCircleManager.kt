package ru.vvdev.yamap

import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactProp
import ru.vvdev.yamap.view.YamapCircle

class YamapCircleManager : ViewGroupManager<YamapCircle>() {

    private val implementation = YamapCircleImpl()

    override fun getName() = YamapCircleImpl.NAME

    override fun getExportedCustomDirectEventTypeConstants() =
        implementation.getExportedCustomDirectEventTypeConstants()

    override fun createViewInstance(context: ThemedReactContext) = YamapCircle(context)

    // PROPS
    @ReactProp(name = "center")
    fun setCenter(view: YamapCircle, center: ReadableMap?) {
        implementation.setCenter(view, center)
    }

    @ReactProp(name = "radius")
    fun setRadius(view: YamapCircle, radius: Float) {
        implementation.setRadius(view, radius)
    }

    @ReactProp(name = "strokeWidth")
    fun setStrokeWidth(view: YamapCircle, width: Float) {
        implementation.setStrokeWidth(view, width)
    }

    @ReactProp(name = "strokeColor")
    fun setStrokeColor(view: YamapCircle, color: Int) {
        implementation.setStrokeColor(view, color)
    }

    @ReactProp(name = "fillColor")
    fun setFillColor(view: YamapCircle, color: Int) {
        implementation.setFillColor(view, color)
    }

    @ReactProp(name = "zI")
    fun setZI(view: YamapCircle, zIndex: Float) {
        implementation.setZI(view, zIndex)
    }

    @ReactProp(name = "handled")
    fun setHandled(view: YamapCircle, handled: Boolean) {
        implementation.setHandled(view, handled)
    }
}
