package ru.vvdev.yamap

import android.view.View
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.viewmanagers.ClusteredYamapViewManagerDelegate
import com.facebook.react.viewmanagers.ClusteredYamapViewManagerInterface
import ru.vvdev.yamap.view.ClusteredYamapView
import ru.vvdev.yamap.view.ClusteredYamapViewManagerImpl
import ru.vvdev.yamap.view.YamapViewManagerImpl

class ClusteredYamapViewManager : ViewGroupManager<ClusteredYamapView>(),
    ClusteredYamapViewManagerInterface<ClusteredYamapView> {

    private val implementation = YamapViewManagerImpl()
    private val clusteredImplementation = ClusteredYamapViewManagerImpl()
    private val delegate = ClusteredYamapViewManagerDelegate(this)

    override fun getDelegate() = delegate

    override fun getName() = ClusteredYamapViewManagerImpl.NAME

    override fun getExportedCustomBubblingEventTypeConstants() =
        YamapViewManagerImpl.exportedCustomBubblingEventTypeConstants

    override fun getCommandsMap() = YamapViewManagerImpl.commandsMap

    override fun receiveCommand(
        view: ClusteredYamapView,
        commandType: String,
        argsArr: ReadableArray?
    ) {
        implementation.receiveCommand(view, commandType, argsArr)
    }

    override fun setClusteredMarkers(view: ClusteredYamapView, points: ReadableArray?) {
        clusteredImplementation.setClusteredMarkers(view, points)
    }

    override fun setClusterColor(view: ClusteredYamapView, color: Int) {
        clusteredImplementation.setClusterColor(view, color)
    }

    override fun createViewInstance(context: ThemedReactContext) =
        clusteredImplementation.createViewInstance(context)

    // PROPS
    override fun setUserLocationIcon(view: ClusteredYamapView, icon: String?) {
        implementation.setUserLocationIcon(view, icon)
    }

    override fun setUserLocationIconScale(view: ClusteredYamapView, scale: Float) {
        implementation.setUserLocationIconScale(view, scale)
    }

    override fun setUserLocationAccuracyFillColor(view: ClusteredYamapView, color: Int) {
        implementation.setUserLocationAccuracyFillColor(view, color)
    }

    override fun setUserLocationAccuracyStrokeColor(view: ClusteredYamapView, color: Int) {
        implementation.setUserLocationAccuracyStrokeColor(view, color)
    }

    override fun setUserLocationAccuracyStrokeWidth(view: ClusteredYamapView, width: Float) {
        implementation.setUserLocationAccuracyStrokeWidth(view, width)
    }

    override fun setShowUserPosition(view: ClusteredYamapView, show: Boolean) {
        implementation.setShowUserPosition(view, show)
    }

    override fun setFollowUser(view: ClusteredYamapView, follow: Boolean) {
        implementation.setFollowUser(view, follow)
    }

    override fun setNightMode(view: ClusteredYamapView, nightMode: Boolean) {
        implementation.setNightMode(view, nightMode)
    }

    override fun setScrollGesturesEnabled(view: ClusteredYamapView, scrollGesturesEnabled: Boolean) {
        implementation.setScrollGesturesEnabled(view, scrollGesturesEnabled)
    }

    override fun setRotateGesturesEnabled(view: ClusteredYamapView, rotateGesturesEnabled: Boolean) {
        implementation.setRotateGesturesEnabled(view, rotateGesturesEnabled)
    }

    override fun setZoomGesturesEnabled(view: ClusteredYamapView, zoomGesturesEnabled: Boolean) {
        implementation.setZoomGesturesEnabled(view, zoomGesturesEnabled)
    }

    override fun setTiltGesturesEnabled(view: ClusteredYamapView, tiltGesturesEnabled: Boolean) {
        implementation.setTiltGesturesEnabled(view, tiltGesturesEnabled)
    }

    override fun setFastTapEnabled(view: ClusteredYamapView, fastTapEnabled: Boolean) {
        implementation.setFastTapEnabled(view, fastTapEnabled)
    }

    override fun setMapStyle(view: ClusteredYamapView, style: String?) {
        implementation.setMapStyle(view, style)
    }

    override fun setMapType(view: ClusteredYamapView, type: String?) {
        implementation.setMapType(view, type)
    }

    override fun setInitialRegion(view: ClusteredYamapView, params: ReadableMap?) {
        implementation.setInitialRegion(view, params)
    }

    override fun setInteractive(view: ClusteredYamapView, interactive: Boolean) {
        implementation.setInteractive(view, interactive)
    }

    override fun setLogoPosition(view: ClusteredYamapView, params: ReadableMap?) {
        implementation.setLogoPosition(view, params)
    }

    override fun setLogoPadding(view: ClusteredYamapView, params: ReadableMap?) {
        implementation.setLogoPadding(view, params)
    }

    override fun addView(parent: ClusteredYamapView, child: View, index: Int) {
        parent.addFeature(child, index)
        super.addView(parent, child, index)
    }

    override fun removeViewAt(parent: ClusteredYamapView, index: Int) {
        parent.removeChild(index)
        super.removeViewAt(parent, index)
    }
}
