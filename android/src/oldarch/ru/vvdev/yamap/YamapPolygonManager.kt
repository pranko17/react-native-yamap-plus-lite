package ru.vvdev.yamap

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactProp
import ru.vvdev.yamap.view.YamapPolygon

class YamapPolygonManager : ViewGroupManager<YamapPolygon>() {

    private var implementation = YamapPolygonImpl()

    override fun getName() = YamapPolygonImpl.NAME

    override fun getExportedCustomDirectEventTypeConstants() =
        implementation.getExportedCustomDirectEventTypeConstants()

    override fun createViewInstance(context: ThemedReactContext) = YamapPolygon(context)

    // PROPS
    @ReactProp(name = "points")
    fun setPoints(view: YamapPolygon, jsPoints: ReadableArray?) {
        implementation.setPoints(view, jsPoints)
    }

    @ReactProp(name = "innerRings")
    fun setInnerRings(view: YamapPolygon, jsRings: ReadableArray?) {
        implementation.setInnerRings(view, jsRings)
    }

    @ReactProp(name = "strokeWidth")
    fun setStrokeWidth(view: YamapPolygon, width: Float) {
        implementation.setStrokeWidth(view, width)
    }

    @ReactProp(name = "strokeColor")
    fun setStrokeColor(view: YamapPolygon, color: Int) {
        implementation.setStrokeColor(view, color)
    }

    @ReactProp(name = "fillColor")
    fun setFillColor(view: YamapPolygon, color: Int) {
        implementation.setFillColor(view, color)
    }

    @ReactProp(name = "zI")
    fun setZI(view: YamapPolygon, zIndex: Int) {
        implementation.setZI(view, zIndex)
    }

    @ReactProp(name = "handled")
    fun setHandled(view: YamapPolygon, handled: Boolean) {
        implementation.setHandled(view, handled)
    }
}
