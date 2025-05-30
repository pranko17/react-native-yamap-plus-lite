package ru.vvdev.yamap

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactProp
import ru.vvdev.yamap.view.YamapPolyline


class YamapPolylineManager : ViewGroupManager<YamapPolyline>() {

    private val implementation = YamapPolylineImpl()

    override fun getName() = YamapPolylineImpl.NAME

    override fun getExportedCustomDirectEventTypeConstants() =
        implementation.getExportedCustomDirectEventTypeConstants()

    override fun createViewInstance(context: ThemedReactContext) = YamapPolyline(context)

    // PROPS
    @ReactProp(name = "points")
    fun setPoints(view: YamapPolyline, jsPoints: ReadableArray?) {
        implementation.setPoints(view, jsPoints)
    }

    @ReactProp(name = "strokeWidth")
    fun setStrokeWidth(view: YamapPolyline, width: Float) {
        implementation.setStrokeWidth(view, width)
    }

    @ReactProp(name = "strokeColor")
    fun setStrokeColor(view: YamapPolyline, color: Int) {
        implementation.setStrokeColor(view, color)
    }

    @ReactProp(name = "zI")
    fun setZI(view: YamapPolyline, zIndex: Float) {
        implementation.setZI(view, zIndex)
    }

    @ReactProp(name = "dashLength")
    fun setDashLength(view: YamapPolyline, length: Float) {
        implementation.setDashLength(view, length)
    }

    @ReactProp(name = "dashOffset")
    fun setDashOffset(view: YamapPolyline, offset: Float) {
        implementation.setDashOffset(view, offset)
    }

    @ReactProp(name = "gapLength")
    fun setGapLength(view: YamapPolyline, length: Float) {
        implementation.setGapLength(view, length)
    }

    @ReactProp(name = "outlineWidth")
    override fun setOutlineWidth(view: YamapPolyline, width: Float) {
        implementation.setOutlineWidth(view, width)
    }

    @ReactProp(name = "outlineColor")
    fun setOutlineColor(view: YamapPolyline, color: Int) {
        implementation.setOutlineColor(view, color)
    }

    @ReactProp(name = "handled")
    fun setHandled(view: YamapPolyline, handled: Boolean) {
        implementation.setHandled(view, handled)
    }
}
