package ru.vvdev.yamap

import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.viewmanagers.YamapCircleManagerDelegate
import com.facebook.react.viewmanagers.YamapCircleManagerInterface
import ru.vvdev.yamap.view.CircleView
import ru.vvdev.yamap.view.CircleViewManagerImpl

class CircleViewManager : ViewGroupManager<CircleView>(), YamapCircleManagerInterface<CircleView> {

    private val implementation = CircleViewManagerImpl()
    private val delegate = YamapCircleManagerDelegate(this)

    override fun getDelegate() = delegate

    override fun getName() = CircleViewManagerImpl.NAME

    override fun getExportedCustomDirectEventTypeConstants() =
        implementation.getExportedCustomDirectEventTypeConstants()

    override fun createViewInstance(context: ThemedReactContext)  = CircleView(context)

    override fun setCenter(view: CircleView, center: ReadableMap?) {
        implementation.setCenter(view, center)
    }

    override fun setRadius(view: CircleView, radius: Float) {
        implementation.setRadius(view, radius)
    }

    override fun setStrokeWidth(view: CircleView, width: Float) {
        implementation.setStrokeWidth(view, width)
    }

    override fun setStrokeColor(view: CircleView, color: Int) {
        implementation.setStrokeColor(view, color)
    }

    override fun setFillColor(view: CircleView, color: Int) {
        implementation.setFillColor(view, color)
    }

    override fun setZI(view: CircleView, zIndex: Float) {
        implementation.setZI(view, zIndex)
    }

    override fun setHandled(view: CircleView, handled: Boolean) {
        implementation.setHandled(view, handled)
    }
}
