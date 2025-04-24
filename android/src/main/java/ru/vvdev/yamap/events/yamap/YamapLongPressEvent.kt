package ru.vvdev.yamap.events.yamap

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.events.Event
import com.yandex.mapkit.geometry.Point

class YamapLongPressEvent(surfaceId: Int, viewId: Int, private val point: Point) : Event<YamapLongPressEvent>(surfaceId, viewId) {
    override fun getEventName(): String {
        return EVENT_NAME
    }
    override fun getCoalescingKey(): Short {
        // All events for a given view can be coalesced.
        return 0
    }

    override fun getEventData(): WritableMap? {
        val data = Arguments.createMap()
        data.putDouble("lat", point.latitude)
        data.putDouble("lon", point.longitude)
        return data
    }

    companion object {
        const val EVENT_NAME = "topYamapLongPress"
    }
}
