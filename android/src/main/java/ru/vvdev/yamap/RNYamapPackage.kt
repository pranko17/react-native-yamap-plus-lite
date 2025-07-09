package ru.vvdev.yamap

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class RNYamapPackage : ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        return listOf(
            RNYamapModule(reactContext)
        )
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return listOf(
            YamapViewManager(),
            ClusteredYamapViewManager(),
            YamapPolygonManager(),
            YamapPolylineManager(),
            YamapMarkerManager(),
            YamapCircleManager()
        )
    }
}
