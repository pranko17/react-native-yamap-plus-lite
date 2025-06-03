package ru.vvdev.yamap

import android.view.View
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactProp
import ru.vvdev.yamap.events.YamapMarkerPressEvent
import ru.vvdev.yamap.utils.PointUtil
import ru.vvdev.yamap.view.MarkerView
import javax.annotation.Nonnull

class YamapMarkerManager internal constructor() : ViewGroupManager<MarkerView>() {
    override fun getName(): String {
        return REACT_CLASS
    }

    override fun getExportedCustomDirectEventTypeConstants(): Map<String, Any> {
        return mapOf(
            YamapMarkerPressEvent.EVENT_NAME to
                    mapOf("registrationName" to "onPress")
        )
    }

    override fun getExportedCustomBubblingEventTypeConstants(): MutableMap<String, Any> {
        return mutableMapOf()
    }

    private fun castToMarkerView(view: View): MarkerView {
        return view as MarkerView
    }

    @Nonnull
    public override fun createViewInstance(@Nonnull context: ThemedReactContext): MarkerView {
        return MarkerView(context)
    }

    // PROPS
    @ReactProp(name = "point")
    fun setPoint(view: View, jsPoint: ReadableMap?) {
        jsPoint?.let {
            val point = PointUtil.readableMapToPoint(it)
            castToMarkerView(view).setPoint(point)
        }
    }

    @ReactProp(name = "zI")
    fun setZI(view: View, zIndex: Float) {
        castToMarkerView(view).setZIndex(zIndex)
    }

    @ReactProp(name = "scale")
    fun setScale(view: View, scale: Float) {
        castToMarkerView(view).setScale(scale)
    }

    @ReactProp(name = "handled")
    fun setHandled(view: View, handled: Boolean?) {
        castToMarkerView(view).setHandled(handled ?: true)
    }

    @ReactProp(name = "rotated")
    fun setRotated(view: View, rotated: Boolean?) {
        castToMarkerView(view).setRotated(rotated ?: true)
    }

    @ReactProp(name = "visible")
    fun setVisible(view: View, visible: Boolean?) {
        castToMarkerView(view).setVisible(visible ?: true)
    }

    @ReactProp(name = "source")
    fun setSource(view: View, source: String?) {
        if (source != null) {
            castToMarkerView(view).setIconSource(source)
        }
    }

    @ReactProp(name = "anchor")
    fun setAnchor(view: View, anchor: ReadableMap?) {
        val pointF = PointUtil.jsPointToPointF(anchor)
        castToMarkerView(view).setAnchor(pointF)
    }

    override fun addView(parent: MarkerView, child: View, index: Int) {
        parent.addChildView(child, index)
        super.addView(parent, child, index)
    }

    override fun removeViewAt(parent: MarkerView, index: Int) {
        parent.removeChildView(index)
        super.removeViewAt(parent, index)
    }

    override fun receiveCommand(
        view: MarkerView,
        commandType: String,
        argsArr: ReadableArray?
    ) {
        val args = argsArr?.getArray(0)?.getMap(0) ?: return

        when (commandType) {
            "animatedMoveTo" -> {
                val jsPoint = args.getMap("coords") ?: return
                val moveDuration = args.getDouble("duration")
                val point = PointUtil.readableMapToPoint(jsPoint)
                castToMarkerView(view).animatedMoveTo(point, moveDuration.toFloat())
                return
            }

            "animatedRotateTo" -> {
                val angle = args.getDouble("angle")
                val rotateDuration = args.getDouble("duration")
                castToMarkerView(view).animatedRotateTo(angle.toFloat(), rotateDuration.toFloat())
                return
            }

            else -> throw IllegalArgumentException(
                String.format(
                    "Unsupported command %d received by %s.",
                    commandType,
                    javaClass.simpleName
                )
            )
        }
    }

    companion object {
        const val REACT_CLASS: String = "YamapMarker"
    }
}
