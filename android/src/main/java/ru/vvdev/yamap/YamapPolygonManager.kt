package ru.vvdev.yamap

import android.view.View
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactProp
import com.yandex.mapkit.geometry.Point
import ru.vvdev.yamap.events.YamapPolygonPressEvent
import ru.vvdev.yamap.utils.PointUtil
import ru.vvdev.yamap.view.YamapPolygon
import javax.annotation.Nonnull

class YamapPolygonManager internal constructor() : ViewGroupManager<YamapPolygon>() {
    override fun getName(): String {
        return REACT_CLASS
    }

    override fun getExportedCustomDirectEventTypeConstants(): Map<String, Any> {
        return mapOf(
            YamapPolygonPressEvent.EVENT_NAME to
                    mapOf("registrationName" to "onPress")
        )
    }

    override fun getExportedCustomBubblingEventTypeConstants(): MutableMap<String, Any> {
        return mutableMapOf()
    }

    private fun castToPolygonView(view: View): YamapPolygon {
        return view as YamapPolygon
    }

    @Nonnull
    public override fun createViewInstance(@Nonnull context: ThemedReactContext): YamapPolygon {
        return YamapPolygon(context)
    }

    // PROPS
    @ReactProp(name = "points")
    fun setPoints(view: View, jsPoints: ReadableArray?) {
        if (jsPoints === null) return

        val points = PointUtil.jsPointsToPoints(jsPoints)
        castToPolygonView(view).setPolygonPoints(points)
    }

    @ReactProp(name = "innerRings")
    fun setInnerRings(view: View, jsRings: ReadableArray?) {
        val rings = ArrayList<ArrayList<Point>>()
        if (jsRings != null) {
            for (j in 0 until jsRings.size()) {
                val jsPoints = jsRings.getArray(j) ?: return
                val points = PointUtil.jsPointsToPoints(jsPoints)
                rings.add(points)
            }
        }
        castToPolygonView(view).setPolygonInnerRings(rings)
    }

    @ReactProp(name = "strokeWidth")
    fun setStrokeWidth(view: View, width: Float) {
        castToPolygonView(view).setStrokeWidth(width)
    }

    @ReactProp(name = "strokeColor")
    fun setStrokeColor(view: View, color: Int) {
        castToPolygonView(view).setStrokeColor(color)
    }

    @ReactProp(name = "fillColor")
    fun setFillColor(view: View, color: Int) {
        castToPolygonView(view).setFillColor(color)
    }

    @ReactProp(name = "zI")
    fun setZI(view: View, zIndex: Int) {
        castToPolygonView(view).setZIndex(zIndex)
    }

    @ReactProp(name = "handled")
    fun setHandled(view: View, handled: Boolean?) {
        castToPolygonView(view).setHandled(handled ?: true)
    }

    companion object {
        const val REACT_CLASS: String = "YamapPolygon"
    }
}
