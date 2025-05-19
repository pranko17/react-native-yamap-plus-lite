package ru.vvdev.yamap.utils

import com.yandex.mapkit.map.MapObject
import com.yandex.mapkit.transport.masstransit.Route
import java.util.UUID

// todo: не используется
class RouteManager {
    private val data = HashMap<String, Route>()
    private val mapObjects = HashMap<String, ArrayList<MapObject>>()

    fun saveRoute(route: Route, id: String) {
        data[id] = route
    }

    companion object {
        fun generateId(): String {
            return UUID.randomUUID().toString()
        }
    }
}
