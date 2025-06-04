package ru.vvdev.yamap.view

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.viewmanagers.YamapPolygonManagerDelegate
import com.facebook.react.viewmanagers.YamapPolygonManagerInterface

class PolygonViewManager : ViewGroupManager<PolygonView>(),  YamapPolygonManagerInterface<PolygonView> {

    private val implementation = PolygonViewManagerImpl()
    private val delegate = YamapPolygonManagerDelegate(this)

    override fun getDelegate() = delegate

    override fun getName() = PolygonViewManagerImpl.NAME

    override fun getExportedCustomDirectEventTypeConstants() =
        implementation.getExportedCustomDirectEventTypeConstants()

    override fun createViewInstance(context: ThemedReactContext) = PolygonView(context)

    // PROPS
    override fun setPoints(view: PolygonView, jsPoints: ReadableArray?) {
        implementation.setPoints(view, jsPoints)
    }

    override fun setInnerRings(view: PolygonView, jsRings: ReadableArray?) {
        implementation.setInnerRings(view, jsRings)
    }

    override fun setStrokeWidth(view: PolygonView, width: Float) {
        implementation.setStrokeWidth(view, width)
    }

    override fun setStrokeColor(view: PolygonView, color: Int) {
        implementation.setStrokeColor(view, color)
    }

    override fun setFillColor(view: PolygonView, color: Int) {
        implementation.setFillColor(view, color)
    }

    override fun setZI(view: PolygonView, zIndex: Float) {
        implementation.setZI(view, zIndex)
    }

    override fun setHandled(view: PolygonView, handled: Boolean) {
        implementation.setHandled(view, handled)
    }
}
