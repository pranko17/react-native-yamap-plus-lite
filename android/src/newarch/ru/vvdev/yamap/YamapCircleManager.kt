package ru.vvdev.yamap

import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.viewmanagers.YamapCircleManagerDelegate
import com.facebook.react.viewmanagers.YamapCircleManagerInterface
import ru.vvdev.yamap.view.YamapCircle

class YamapCircleManager : ViewGroupManager<YamapCircle>(), YamapCircleManagerInterface<YamapCircle> {

    private val delegate = YamapCircleManagerDelegate(this)

    override fun getDelegate() = delegate

    private var implementation = YamapCircleImpl()

    override fun getName() = YamapCircleImpl.NAME

    override fun getExportedCustomDirectEventTypeConstants() =
        implementation.getExportedCustomDirectEventTypeConstants()

    override fun createViewInstance(context: ThemedReactContext)  = YamapCircle(context)

    override fun setCenter(view: YamapCircle, center: ReadableMap?) {
        implementation.setCenter(view, center)
    }

    override fun setRadius(view: YamapCircle, radius: Float) {
        implementation.setRadius(view, radius)
    }

    override fun setStrokeWidth(view: YamapCircle, width: Float) {
        implementation.setStrokeWidth(view, width)
    }

    override fun setStrokeColor(view: YamapCircle, color: Int) {
        implementation.setStrokeColor(view, color)
    }

    override fun setFillColor(view: YamapCircle, color: Int) {
        implementation.setFillColor(view, color)
    }

    override fun setZI(view: YamapCircle, zIndex: Int) {
        implementation.setZI(view, zIndex)
    }

    override fun setHandled(view: YamapCircle, handled: Boolean) {
        implementation.setHandled(view, handled)
    }
}
