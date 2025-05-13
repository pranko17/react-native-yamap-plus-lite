package ru.vvdev.yamap.utils

import android.content.Context
import android.graphics.Bitmap
import com.yandex.runtime.image.ImageProvider
import ru.vvdev.yamap.utils.ImageLoader.DownloadImageBitmap

class ImageCacheManager {
    companion object {
        private val imageCache = mutableMapOf<String, ImageProvider>()

        fun getImage(context: Context, source: String, setPlacemark: (imageProvider: ImageProvider) -> Unit) {
            imageCache[source]?.let {
                setPlacemark(it)
                return
            }

            DownloadImageBitmap(context, source, object : Callback<Bitmap?> {
                override fun invoke(arg: Bitmap?) {
                    try {
                        ImageProvider.fromBitmap(arg).let {
                            setPlacemark(it)
                            imageCache[source] = it
                        }
                    } catch (e: Exception) {
                        e.printStackTrace()
                    }
                }
            })
        }
    }
}
