package ru.vvdev.yamap

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager
import ru.vvdev.yamap.module.SearchModule
import ru.vvdev.yamap.module.SuggestsModule
import ru.vvdev.yamap.module.YamapModule
import ru.vvdev.yamap.view.YamapViewManager
import ru.vvdev.yamap.view.ClusteredYamapViewManager
import ru.vvdev.yamap.view.PolygonViewManager
import ru.vvdev.yamap.view.PolylineViewManager
import ru.vvdev.yamap.view.MarkerViewManager
import ru.vvdev.yamap.view.CircleViewManager

class YamapPackage : ReactPackage {

    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> =
        listOf(
            SearchModule(reactContext),
            SuggestsModule(reactContext),
            YamapModule(reactContext)
        )

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> =
        listOf(
            YamapViewManager(),
            ClusteredYamapViewManager(),
            PolygonViewManager(),
            PolylineViewManager(),
            MarkerViewManager(),
            CircleViewManager()
        )
}
