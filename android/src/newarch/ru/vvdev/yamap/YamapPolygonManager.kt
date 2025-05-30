package ru.vvdev.yamap

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.viewmanagers.YamapPolygonManagerDelegate
import com.facebook.react.viewmanagers.YamapPolygonManagerInterface
import ru.vvdev.yamap.view.YamapPolygon
import javax.annotation.Nonnull

class YamapPolygonManager : ViewGroupManager<YamapPolygon>(),  YamapPolygonManagerInterface<YamapPolygon> {

    private val delegate = YamapPolygonManagerDelegate(this)

    override fun getDelegate() = delegate

    private var implementation = YamapPolygonImpl()

    override fun getName() = YamapPolygonImpl.NAME

    override fun getExportedCustomDirectEventTypeConstants() =
        implementation.getExportedCustomDirectEventTypeConstants()

    override fun createViewInstance(@Nonnull context: ThemedReactContext) = YamapPolygon(context)

    // PROPS
    override fun setPoints(view: YamapPolygon, jsPoints: ReadableArray?) {
        implementation.setPoints(view, jsPoints)
    }

    override fun setInnerRings(view: YamapPolygon, jsRings: ReadableArray?) {
        implementation.setInnerRings(view, jsRings)
    }

    override fun setStrokeWidth(view: YamapPolygon, width: Float) {
        implementation.setStrokeWidth(view, width)
    }

    override fun setStrokeColor(view: YamapPolygon, color: Int) {
        implementation.setStrokeColor(view, color)
    }

    override fun setFillColor(view: YamapPolygon, color: Int) {
        implementation.setFillColor(view, color)
    }

    override fun setZI(view: YamapPolygon, zIndex: Int) {
        implementation.setZI(view, zIndex)
    }

    override fun setHandled(view: YamapPolygon, handled: Boolean) {
        implementation.setHandled(view, handled)
    }
}
