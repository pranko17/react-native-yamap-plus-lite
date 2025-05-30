package ru.vvdev.yamap

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.viewmanagers.YamapPolylineManagerDelegate
import com.facebook.react.viewmanagers.YamapPolylineManagerInterface
import ru.vvdev.yamap.view.YamapPolyline

class YamapPolylineManager : ViewGroupManager<YamapPolyline>(), YamapPolylineManagerInterface<YamapPolyline> {

    private val implementation = YamapPolylineImpl()
    private val delegate = YamapPolylineManagerDelegate(this)

    override fun getDelegate() = delegate

    override fun getName() = YamapPolylineImpl.NAME

    override fun getExportedCustomDirectEventTypeConstants() =
        implementation.getExportedCustomDirectEventTypeConstants()

    override fun createViewInstance(context: ThemedReactContext) = YamapPolyline(context)

    // PROPS
    override fun setPoints(view: YamapPolyline, jsPoints: ReadableArray?) {
        implementation.setPoints(view, jsPoints)
    }

    override fun setStrokeWidth(view: YamapPolyline, width: Float) {
        implementation.setStrokeWidth(view, width)
    }

    override fun setStrokeColor(view: YamapPolyline, color: Int) {
        implementation.setStrokeColor(view, color)
    }

    override fun setZI(view: YamapPolyline, zIndex: Float) {
        implementation.setZI(view, zIndex)
    }

    override fun setDashLength(view: YamapPolyline, length: Float) {
        implementation.setDashLength(view, length)
    }

    override fun setDashOffset(view: YamapPolyline, offset: Float) {
        implementation.setDashOffset(view, offset)
    }

    override fun setGapLength(view: YamapPolyline, length: Float) {
        implementation.setGapLength(view, length)
    }

    override fun setOutlineWidth(view: YamapPolyline, width: Float) {
        implementation.setOutlineWidth(view, width)
    }

    override fun setOutlineColor(view: YamapPolyline, color: Int) {
        implementation.setOutlineColor(view, color)
    }

    override fun setHandled(view: YamapPolyline, handled: Boolean) {
        implementation.setHandled(view, handled)
    }
}
