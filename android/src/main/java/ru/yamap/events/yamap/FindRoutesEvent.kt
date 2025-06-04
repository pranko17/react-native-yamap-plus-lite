package ru.yamap.events.yamap

import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.events.Event

class FindRoutesEvent(surfaceId: Int, viewId: Int, private val eventData: WritableMap?)
    : Event<FindRoutesEvent>(surfaceId, viewId) {

    override fun getEventName(): String {
        return EVENT_NAME
    }
    override fun getCoalescingKey(): Short {
        // All events for a given view can be coalesced.
        return 0
    }

    override fun getEventData(): WritableMap? = eventData

    companion object {
        const val EVENT_NAME = "topRouteFound"
    }
}
