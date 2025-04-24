package ru.vvdev.yamap.events.yamap

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.events.Event
import com.yandex.mapkit.map.VisibleRegion

class GetVisibleRegionEvent(surfaceId: Int, viewId: Int, private val region: VisibleRegion, private val id: String?)
    : Event<GetVisibleRegionEvent>(surfaceId, viewId) {

    override fun getEventName(): String {
        return EVENT_NAME
    }
    override fun getCoalescingKey(): Short {
        // All events for a given view can be coalesced.
        return 0
    }

    override fun getEventData(): WritableMap? {
        val result = Arguments.createMap()

        val bl = Arguments.createMap()
        bl.putDouble("lat", region.bottomLeft.latitude)
        bl.putDouble("lon", region.bottomLeft.longitude)
        result.putMap("bottomLeft", bl)

        val br = Arguments.createMap()
        br.putDouble("lat", region.bottomRight.latitude)
        br.putDouble("lon", region.bottomRight.longitude)
        result.putMap("bottomRight", br)

        val tl = Arguments.createMap()
        tl.putDouble("lat", region.topLeft.latitude)
        tl.putDouble("lon", region.topLeft.longitude)
        result.putMap("topLeft", tl)

        val tr = Arguments.createMap()
        tr.putDouble("lat", region.topRight.latitude)
        tr.putDouble("lon", region.topRight.longitude)
        result.putMap("topRight", tr)

        result.putString("id", id)

        return result
    }

    companion object {
        const val EVENT_NAME = "topGetVisibleRegion"
    }
}
