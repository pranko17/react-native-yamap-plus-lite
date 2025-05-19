package ru.vvdev.yamap

import android.view.View
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactProp
import ru.vvdev.yamap.events.YamapPolylinePressEvent
import ru.vvdev.yamap.utils.PointUtil
import ru.vvdev.yamap.view.YamapPolyline
import javax.annotation.Nonnull

class YamapPolylineManager internal constructor() : ViewGroupManager<YamapPolyline>() {
    override fun getName(): String {
        return REACT_CLASS
    }

    override fun getExportedCustomDirectEventTypeConstants(): Map<String, Any> {
        return mapOf(
            YamapPolylinePressEvent.EVENT_NAME to
                    mapOf("registrationName" to "onPress")
        )
    }

    override fun getExportedCustomBubblingEventTypeConstants(): MutableMap<String, Any> {
        return mutableMapOf()
    }

    private fun castToPolylineView(view: View): YamapPolyline {
        return view as YamapPolyline
    }

    @Nonnull
    public override fun createViewInstance(@Nonnull context: ThemedReactContext): YamapPolyline {
        return YamapPolyline(context)
    }

    // PROPS
    @ReactProp(name = "points")
    fun setPoints(view: View, jsPoints: ReadableArray?) {
        val points = jsPoints?.let { PointUtil.jsPointsToPoints(it) }
        castToPolylineView(view).setPolygonPoints(points)
    }

    @ReactProp(name = "strokeWidth")
    fun setStrokeWidth(view: View, width: Float) {
        castToPolylineView(view).setStrokeWidth(width)
    }

    @ReactProp(name = "strokeColor")
    fun setStrokeColor(view: View, color: Int) {
        castToPolylineView(view).setStrokeColor(color)
    }

    @ReactProp(name = "zIndex")
    fun setZIndex(view: View, zIndex: Int) {
        castToPolylineView(view).setZIndex(zIndex)
    }

    @ReactProp(name = "dashLength")
    fun setDashLength(view: View, length: Int) {
        castToPolylineView(view).setDashLength(length)
    }

    @ReactProp(name = "dashOffset")
    fun setDashOffset(view: View, offset: Int) {
        castToPolylineView(view).setDashOffset(offset.toFloat())
    }

    @ReactProp(name = "gapLength")
    fun setGapLength(view: View, length: Int) {
        castToPolylineView(view).setGapLength(length)
    }

    @ReactProp(name = "outlineWidth")
    fun setOutlineWidth(view: View, width: Int) {
        castToPolylineView(view).setOutlineWidth(width)
    }

    @ReactProp(name = "outlineColor")
    fun setOutlineColor(view: View, color: Int) {
        castToPolylineView(view).setOutlineColor(color)
    }

    @ReactProp(name = "handled")
    fun setHandled(view: View, handled: Boolean?) {
        castToPolylineView(view).setHandled(handled ?: true)
    }

    companion object {
        const val REACT_CLASS: String = "YamapPolyline"
    }
}
