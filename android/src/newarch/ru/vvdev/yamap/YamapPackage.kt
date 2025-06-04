package ru.vvdev.yamap

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import com.facebook.react.uimanager.ViewManager
import ru.vvdev.yamap.module.SearchModule
import ru.vvdev.yamap.module.SearchModuleImpl
import ru.vvdev.yamap.module.SuggestsModule
import ru.vvdev.yamap.module.SuggestsModuleImpl
import ru.vvdev.yamap.module.YamapModule
import ru.vvdev.yamap.module.YamapModuleImpl
import ru.vvdev.yamap.view.YamapViewManager
import ru.vvdev.yamap.view.ClusteredYamapViewManager
import ru.vvdev.yamap.view.PolygonViewManager
import ru.vvdev.yamap.view.PolylineViewManager
import ru.vvdev.yamap.view.MarkerViewManager
import ru.vvdev.yamap.view.CircleViewManager

class YamapPackage : BaseReactPackage() {

    override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? =
        when (name) {
            SearchModuleImpl.NAME -> SearchModule(reactContext)
            SuggestsModuleImpl.NAME -> SuggestsModule(reactContext)
            YamapModuleImpl.NAME -> YamapModule(reactContext)

            else -> null
        }

    override fun getReactModuleInfoProvider() = ReactModuleInfoProvider {
        mapOf(
            SearchModuleImpl.NAME to ReactModuleInfo(
                name = SearchModuleImpl.NAME,
                className = SearchModuleImpl.NAME,
                canOverrideExistingModule = false,
                needsEagerInit = false,
                isCxxModule = false,
                isTurboModule = true
            ),
            SuggestsModuleImpl.NAME to ReactModuleInfo(
                name = SuggestsModuleImpl.NAME,
                className = SuggestsModuleImpl.NAME,
                canOverrideExistingModule = false,
                needsEagerInit = false,
                isCxxModule = false,
                isTurboModule = true
            ),
            YamapModuleImpl.NAME to ReactModuleInfo(
                name = YamapModuleImpl.NAME,
                className = YamapModuleImpl.NAME,
                canOverrideExistingModule = false,
                needsEagerInit = false,
                isCxxModule = false,
                isTurboModule = true
            ),
        )
    }

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
