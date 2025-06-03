package ru.vvdev.yamap

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager
import ru.vvdev.yamap.search.RNYandexSearchModule
import ru.vvdev.yamap.suggest.RNYandexSuggestModule
import ru.vvdev.yamap.view.ClusteredYamapViewManager
import ru.vvdev.yamap.view.YamapViewManager

class RNYamapPackage : ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        return listOf(
            RNYamapModule(reactContext),
            RNYandexSuggestModule(reactContext),
            RNYandexSearchModule(reactContext)
        )
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return listOf(
            YamapViewManager(),
            ClusteredYamapViewManager(),
            PolygonViewManager(),
            PolylineViewManager(),
            MarkerViewManager(),
            CircleViewManager()
        )
    }
}
