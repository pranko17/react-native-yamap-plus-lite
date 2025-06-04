package ru.yamap.view

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.viewmanagers.YamapPolylineManagerDelegate
import com.facebook.react.viewmanagers.YamapPolylineManagerInterface

class PolylineViewManager : ViewGroupManager<PolylineView>(), YamapPolylineManagerInterface<PolylineView> {

    private val implementation = PolylineViewManagerImpl()
    private val delegate = YamapPolylineManagerDelegate(this)

    override fun getDelegate() = delegate

    override fun getName() = PolylineViewManagerImpl.NAME

    override fun getExportedCustomDirectEventTypeConstants() =
        implementation.getExportedCustomDirectEventTypeConstants()

    override fun createViewInstance(context: ThemedReactContext) = PolylineView(context)

    // PROPS
    override fun setPoints(view: PolylineView, jsPoints: ReadableArray?) {
        implementation.setPoints(view, jsPoints)
    }

    override fun setStrokeWidth(view: PolylineView, width: Float) {
        implementation.setStrokeWidth(view, width)
    }

    override fun setStrokeColor(view: PolylineView, color: Int) {
        implementation.setStrokeColor(view, color)
    }

    override fun setZI(view: PolylineView, zIndex: Float) {
        implementation.setZI(view, zIndex)
    }

    override fun setDashLength(view: PolylineView, length: Float) {
        implementation.setDashLength(view, length)
    }

    override fun setDashOffset(view: PolylineView, offset: Float) {
        implementation.setDashOffset(view, offset)
    }

    override fun setGapLength(view: PolylineView, length: Float) {
        implementation.setGapLength(view, length)
    }

    override fun setOutlineWidth(view: PolylineView, width: Float) {
        implementation.setOutlineWidth(view, width)
    }

    override fun setOutlineColor(view: PolylineView, color: Int) {
        implementation.setOutlineColor(view, color)
    }

    override fun setHandled(view: PolylineView, handled: Boolean) {
        implementation.setHandled(view, handled)
    }
}
