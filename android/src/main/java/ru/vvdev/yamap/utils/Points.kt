package ru.vvdev.yamap.utils

import com.facebook.react.bridge.ReadableArray
import com.yandex.mapkit.geometry.Point

class Points {
    companion object {
        fun jsPointsToPoints(jsPoints: ReadableArray): ArrayList<Point> {
            val points = ArrayList<Point>()

            for (i in 0 until jsPoints.size()) {
                jsPoints.getMap(i)?.let {
                    points.add(Point(it.getDouble("lat"), it.getDouble("lon")))
                }
            }

            return points
        }
    }
}
