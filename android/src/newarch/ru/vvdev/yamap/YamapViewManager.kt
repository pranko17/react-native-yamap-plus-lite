package ru.vvdev.yamap

import android.view.View
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.viewmanagers.YamapViewManagerDelegate
import com.facebook.react.viewmanagers.YamapViewManagerInterface
import ru.vvdev.yamap.view.YamapView
import ru.vvdev.yamap.view.YamapViewManagerImpl

class YamapViewManager : ViewGroupManager<YamapView>(), YamapViewManagerInterface<YamapView> {

    private val implementation = YamapViewManagerImpl()
    private val delegate = YamapViewManagerDelegate(this)

    override fun getDelegate() = delegate

    override fun getName() = YamapViewManagerImpl.NAME

    override fun getExportedCustomBubblingEventTypeConstants() =
        implementation.getExportedCustomBubblingEventTypeConstants()

    override fun getCommandsMap() = implementation.getCommandsMap()

    override fun receiveCommand(view: YamapView, commandType: String, argsArr: ReadableArray?) {
        implementation.receiveCommand(view, commandType, argsArr)
    }

    override fun createViewInstance(context: ThemedReactContext) =
        implementation.createViewInstance(context)

    // PROPS
    override fun setUserLocationIcon(view: YamapView, icon: String?) {
        implementation.setUserLocationIcon(view, icon)
    }

    override fun setUserLocationIconScale(view: YamapView, scale: Float) {
        implementation.setUserLocationIconScale(view, scale)
    }

    override fun setUserLocationAccuracyFillColor(view: YamapView, color: Int) {
        implementation.setUserLocationAccuracyFillColor(view, color)
    }

    override fun setUserLocationAccuracyStrokeColor(view: YamapView, color: Int) {
        implementation.setUserLocationAccuracyStrokeColor(view, color)
    }

    override fun setUserLocationAccuracyStrokeWidth(view: YamapView, width: Float) {
        implementation.setUserLocationAccuracyStrokeWidth(view, width)
    }

    override fun setShowUserPosition(view: YamapView, show: Boolean) {
        implementation.setShowUserPosition(view, show)
    }

    override fun setNightMode(view: YamapView, nightMode: Boolean) {
        implementation.setNightMode(view, nightMode)
    }

    override fun setScrollGesturesEnabled(view: YamapView, scrollGesturesEnabled: Boolean) {
        implementation.setScrollGesturesEnabled(view, scrollGesturesEnabled)
    }

    override fun setRotateGesturesEnabled(view: YamapView, rotateGesturesEnabled: Boolean) {
        implementation.setRotateGesturesEnabled(view, rotateGesturesEnabled)
    }

    override fun setZoomGesturesEnabled(view: YamapView, zoomGesturesEnabled: Boolean) {
        implementation.setZoomGesturesEnabled(view, zoomGesturesEnabled)
    }

    override fun setTiltGesturesEnabled(view: YamapView, tiltGesturesEnabled: Boolean) {
        implementation.setTiltGesturesEnabled(view, tiltGesturesEnabled)
    }

    override fun setFastTapEnabled(view: YamapView, fastTapEnabled: Boolean) {
        implementation.setFastTapEnabled(view, fastTapEnabled)
    }

    override fun setMapStyle(view: YamapView, style: String?) {
        implementation.setMapStyle(view, style)
    }

    override fun setMapType(view: YamapView, type: String?) {
        implementation.setMapType(view, type)
    }

    override fun setInitialRegion(view: YamapView, params: ReadableMap?) {
        implementation.setInitialRegion(view, params)
    }

    override fun setInteractive(view: YamapView, interactive: Boolean) {
        implementation.setInteractive(view, interactive)
    }

    override fun setLogoPosition(view: YamapView, params: ReadableMap?) {
        implementation.setLogoPosition(view, params)
    }

    override fun setLogoPadding(view: YamapView, params: ReadableMap?) {
        implementation.setLogoPadding(view, params)
    }

    override fun setFollowUser(view: YamapView, value: Boolean) {
        implementation.setFollowUser(view, value)
    }

    override fun addView(parent: YamapView, child: View, index: Int) {
        parent.addFeature(child, index)
        super.addView(parent, child, index)
    }

    override fun removeViewAt(parent: YamapView, index: Int) {
        parent.removeChild(index)
        super.removeViewAt(parent, index)
    }
}
