package ru.yamap.view

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.ThemedReactContext
import com.yandex.mapkit.MapKitFactory

class ClusteredYamapViewManagerImpl() {

    fun setClusteredMarkers(view: ClusteredYamapView, points: ReadableArray?) {
        points?.let {
            @Suppress("UNCHECKED_CAST")
            view.setClusteredMarkers(it.toArrayList() as ArrayList<HashMap<String, Double>>)
        }
    }

    fun setClusterColor(view: ClusteredYamapView, color: Int) {
        view.setClustersColor(color)
    }

    fun createViewInstance(context: ThemedReactContext): ClusteredYamapView {
        val view = ClusteredYamapView(context)
        MapKitFactory.getInstance().onStart()
        view.onStart()
        return view
    }

    companion object {
        const val NAME = "ClusteredYamapView"
    }
}
