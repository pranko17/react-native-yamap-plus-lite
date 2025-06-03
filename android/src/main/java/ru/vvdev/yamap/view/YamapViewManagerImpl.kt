package ru.vvdev.yamap.view

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.ThemedReactContext
import com.yandex.mapkit.MapKitFactory
import com.yandex.mapkit.map.CameraPosition
import ru.vvdev.yamap.events.yamap.CameraPositionChangeEndEvent
import ru.vvdev.yamap.events.yamap.CameraPositionChangeEvent
import ru.vvdev.yamap.events.yamap.FindRoutesEvent
import ru.vvdev.yamap.events.yamap.GetCameraPositionEvent
import ru.vvdev.yamap.events.yamap.GetScreenToWorldPointsEvent
import ru.vvdev.yamap.events.yamap.GetVisibleRegionEvent
import ru.vvdev.yamap.events.yamap.GetWorldToScreenPointsEvent
import ru.vvdev.yamap.events.yamap.MapLoadedEvent
import ru.vvdev.yamap.events.yamap.YamapLongPressEvent
import ru.vvdev.yamap.events.yamap.YamapPressEvent
import ru.vvdev.yamap.utils.PointUtil

class YamapViewManagerImpl() {

    fun getExportedCustomBubblingEventTypeConstants() = mutableMapOf(
        FindRoutesEvent.EVENT_NAME to
                mapOf("phasedRegistrationNames" to mapOf("bubbled" to "onRouteFound")),
        GetCameraPositionEvent.EVENT_NAME to
                mapOf("phasedRegistrationNames" to mapOf("bubbled" to "onCameraPositionReceived")),
        CameraPositionChangeEvent.EVENT_NAME to
                mapOf("phasedRegistrationNames" to mapOf("bubbled" to "onCameraPositionChange")),
        CameraPositionChangeEndEvent.EVENT_NAME to
                mapOf("phasedRegistrationNames" to mapOf("bubbled" to "onCameraPositionChangeEnd")),
        GetVisibleRegionEvent.EVENT_NAME to
                mapOf("phasedRegistrationNames" to mapOf("bubbled" to "onVisibleRegionReceived")),
        YamapPressEvent.EVENT_NAME to
                mapOf("phasedRegistrationNames" to mapOf("bubbled" to "onMapPress")),
        YamapLongPressEvent.EVENT_NAME to
                mapOf("phasedRegistrationNames" to mapOf("bubbled" to "onMapLongPress")),
        MapLoadedEvent.EVENT_NAME to
                mapOf("phasedRegistrationNames" to mapOf("bubbled" to "onMapLoaded")),
        GetScreenToWorldPointsEvent.EVENT_NAME to
                mapOf("phasedRegistrationNames" to mapOf("bubbled" to "onScreenToWorldPointsReceived")),
        GetWorldToScreenPointsEvent.EVENT_NAME to
                mapOf("phasedRegistrationNames" to mapOf("bubbled" to "onWorldToScreenPointsReceived")),
    )

    fun getCommandsMap() = mapOf(
        "setCenter" to SET_CENTER,
        "fitAllMarkers" to FIT_ALL_MARKERS,
        "findRoutes" to FIND_ROUTES,
        "setZoom" to SET_ZOOM,
        "getCameraPosition" to GET_CAMERA_POSITION,
        "getVisibleRegion" to GET_VISIBLE_REGION,
        "setTrafficVisible" to SET_TRAFFIC_VISIBLE,
        "fitMarkers" to FIT_MARKERS,
        "getScreenPoints" to GET_SCREEN_POINTS,
        "getWorldPoints" to GET_WORLD_POINTS,
    )

    fun receiveCommand(view: YamapView, commandType: String, argsArr: ReadableArray?) {
        val args = argsArr?.getArray(0)?.getMap(0) ?: return

        when (commandType) {
            "setCenter" -> setCenter(
                view,
                args.getMap("center"),
                args.getDouble("zoom").toFloat(),
                args.getDouble("azimuth").toFloat(),
                args.getDouble("tilt").toFloat(),
                args.getDouble("duration").toFloat(),
                args.getInt("animation")
            )
            "fitAllMarkers" -> fitAllMarkers(view)
            "fitMarkers" -> fitMarkers(view, args.getArray("points"))
            "findRoutes" -> findRoutes(
                view,
                args.getArray("points"),
                args.getArray("vehicles"),
                args.getString("id")
            )
            "setZoom" -> view.setZoom(
                args.getDouble("zoom").toFloat(),
                args.getDouble("duration").toFloat(),
                args.getInt("animation")
            )
            "getCameraPosition" -> view.emitCameraPositionToJS(args.getString("id"))
            "getVisibleRegion" -> view.emitVisibleRegionToJS(args.getString("id"))
            "setTrafficVisible" -> view.setTrafficVisible(args.getBoolean("isVisible"))
            "getScreenPoints" -> view.emitWorldToScreenPoints(
                args.getArray("points"),
                args.getString("id")
            )
            "getWorldPoints" -> view.emitScreenToWorldPoints(
                args.getArray("points"),
                args.getString("id")
            )

            else -> throw IllegalArgumentException(
                String.format(
                    "Unsupported command %d received by %s.",
                    commandType,
                    javaClass.simpleName
                )
            )
        }
    }

    fun createViewInstance(context: ThemedReactContext): YamapView {
        val view = YamapView(context)
        MapKitFactory.getInstance().onStart()
        view.onStart()

        return view
    }

    private fun setCenter(
        view: YamapView,
        center: ReadableMap?,
        zoom: Float,
        azimuth: Float,
        tilt: Float,
        duration: Float,
        animation: Int
    ) {
        center?.let {
            val point = PointUtil.readableMapToPoint(it)
            val position = CameraPosition(point, zoom, azimuth, tilt)
            view.setCenter(position, duration, animation)
        }
    }

    private fun fitAllMarkers(view: YamapView) {
        view.fitAllMarkers()
    }

    private fun fitMarkers(view: YamapView, jsPoints: ReadableArray?) {
        if (jsPoints != null) {
            val points = PointUtil.jsPointsToPoints(jsPoints)
            view.fitMarkers(points)
        }
    }

    private fun findRoutes(
        view: YamapView,
        jsPoints: ReadableArray?,
        jsVehicles: ReadableArray?,
        id: String?
    ) {
        if (jsPoints != null) {
            val points = PointUtil.jsPointsToPoints(jsPoints)

            val vehicles = ArrayList<String>()

            if (jsVehicles != null) {
                for (i in 0 until jsVehicles.size()) {
                    jsVehicles.getString(i)?.let { vehicles.add(it) }
                }
            }

            view.findRoutes(points, vehicles, id)
        }
    }

    // PROPS
    fun setUserLocationIcon(view: YamapView, icon: String?) {
        if (icon != null) {
            view.setUserLocationIcon(icon)
        }
    }

    fun setUserLocationIconScale(view: YamapView, scale: Float) {
        view.setUserLocationIconScale(scale)
    }

    fun setUserLocationAccuracyFillColor(view: YamapView, color: Int) {
        view.setUserLocationAccuracyFillColor(color)
    }

    fun setUserLocationAccuracyStrokeColor(view: YamapView, color: Int) {
        view.setUserLocationAccuracyStrokeColor(color)
    }

    fun setUserLocationAccuracyStrokeWidth(view: YamapView, width: Float) {
        view.setUserLocationAccuracyStrokeWidth(width)
    }

    fun setShowUserPosition(view: YamapView, show: Boolean) {
        view.setShowUserPosition(show)
    }

    fun setNightMode(view: YamapView, nightMode: Boolean) {
        view.setNightMode(nightMode)
    }

    fun setScrollGesturesEnabled(view: YamapView, scrollGesturesEnabled: Boolean) {
        view.setScrollGesturesEnabled(scrollGesturesEnabled)
    }

    fun setRotateGesturesEnabled(view: YamapView, rotateGesturesEnabled: Boolean) {
        view.setRotateGesturesEnabled(rotateGesturesEnabled)
    }

    fun setZoomGesturesEnabled(view: YamapView, zoomGesturesEnabled: Boolean) {
        view.setZoomGesturesEnabled(zoomGesturesEnabled)
    }

    fun setTiltGesturesEnabled(view: YamapView, tiltGesturesEnabled: Boolean) {
        view.setTiltGesturesEnabled(tiltGesturesEnabled)
    }

    fun setFastTapEnabled(view: YamapView, fastTapEnabled: Boolean) {
        view.setFastTapEnabled(fastTapEnabled)
    }

    fun setMapStyle(view: YamapView, style: String?) {
        if (style != null) {
            view.setMapStyle(style)
        }
    }

    fun setMapType(view: YamapView, type: String?) {
        if (type != null) {
            view.setMapType(type)
        }
    }

    fun setInitialRegion(view: YamapView, params: ReadableMap?) {
        if (params != null) {
            view.setInitialRegion(params)
        }
    }

    fun setInteractive(view: YamapView, interactive: Boolean) {
        view.setInteractive(interactive)
    }

    fun setLogoPosition(view: YamapView, params: ReadableMap?) {
        if (params != null) {
            view.setLogoPosition(params)
        }
    }

    fun setLogoPadding(view: YamapView, params: ReadableMap?) {
        if (params != null) {
            view.setLogoPadding(params)
        }
    }

    fun setFollowUser(view: YamapView, value: Boolean) {
        view.setFollowUser(value)
    }

    companion object {
        const val NAME = "YamapView"

        private const val SET_CENTER = 1
        private const val FIT_ALL_MARKERS = 2
        private const val FIND_ROUTES = 3
        private const val SET_ZOOM = 4
        private const val GET_CAMERA_POSITION = 5
        private const val GET_VISIBLE_REGION = 6
        private const val SET_TRAFFIC_VISIBLE = 7
        private const val FIT_MARKERS = 8
        private const val GET_SCREEN_POINTS = 9
        private const val GET_WORLD_POINTS = 10
    }
}
