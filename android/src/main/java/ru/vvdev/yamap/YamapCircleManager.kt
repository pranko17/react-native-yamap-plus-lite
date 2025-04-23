package ru.vvdev.yamap

import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactProp
import com.yandex.mapkit.geometry.Point
import ru.vvdev.yamap.events.YamapCirclePressEvent
import ru.vvdev.yamap.view.YamapCircle
import javax.annotation.Nonnull

class YamapCircleManager internal constructor() : ViewGroupManager<YamapCircle>() {
    override fun getName(): String {
        return REACT_CLASS
    }

    override fun getExportedCustomDirectEventTypeConstants(): Map<String, Any> {
        return mapOf(
            YamapCirclePressEvent.EVENT_NAME to
                    mapOf("registrationName" to "onPress")
        )
    }

    override fun getExportedCustomBubblingEventTypeConstants(): MutableMap<String, Any> {
        return mutableMapOf()
    }

    @Nonnull
    public override fun createViewInstance(@Nonnull context: ThemedReactContext): YamapCircle {
        return YamapCircle(context)
    }

    // PROPS
    @ReactProp(name = "center")
    fun setCenter(view: YamapCircle, center: ReadableMap?) {
        if (center != null) {
            val lon = center.getDouble("lon")
            val lat = center.getDouble("lat")
            val point = Point(lat, lon)
            view.setCenter(point)
        }
    }

    @ReactProp(name = "radius")
    fun setRadius(view: YamapCircle, radius: Float) {
        view.setRadius(radius)
    }

    @ReactProp(name = "strokeWidth")
    fun setStrokeWidth(view: YamapCircle, width: Float) {
        view.setStrokeWidth(width)
    }

    @ReactProp(name = "strokeColor")
    fun setStrokeColor(view: YamapCircle, color: Int) {
        view.setStrokeColor(color)
    }

    @ReactProp(name = "fillColor")
    fun setFillColor(view: YamapCircle, color: Int) {
        view.setFillColor(color)
    }

    @ReactProp(name = "zIndex")
    fun setZIndex(view: YamapCircle, zIndex: Int) {
        view.setZIndex(zIndex)
    }

    @ReactProp(name = "handled")
    fun setHandled(view: YamapCircle, handled: Boolean?) {
        view.setHandled(handled ?: true)
    }

    companion object {
        const val REACT_CLASS: String = "YamapCircle"
    }
}
