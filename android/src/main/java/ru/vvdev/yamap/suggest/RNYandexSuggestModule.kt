package ru.vvdev.yamap.suggest

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.UiThreadUtil
import ru.vvdev.yamap.utils.Callback

class RNYandexSuggestModule(reactContext: ReactApplicationContext?) :
    ReactContextBaseJavaModule(reactContext) {
    private var _suggestClient: MapSuggestClient? = null
    private val _argsHelper = YandexSuggestRNArgsHelper()

    override fun getName(): String {
        return "YamapSuggests"
    }

    @ReactMethod
    fun suggest(text: String?, promise: Promise) {
        if (text == null) {
            promise.reject(ERR_NO_REQUEST_ARG, "suggest request: text arg is not provided")
            return
        }

        UiThreadUtil.runOnUiThread {
            getSuggestClient().suggest(text,
                object : Callback<List<MapSuggestItem?>?> {
                    override fun invoke(arg: List<MapSuggestItem?>?) {
                        promise.resolve(_argsHelper.createSuggestsMapFrom(arg))
                    }
                },
                object : Callback<Throwable?> {
                    override fun invoke(arg: Throwable?) {
                        promise.reject(ERR_SUGGEST_FAILED, "suggest request: " + arg?.message)
                    }
                }
            )
        }
    }

    @ReactMethod
    fun suggestWithOptions(text: String?, options: ReadableMap?, promise: Promise) {
        if (text == null) {
            promise.reject(ERR_NO_REQUEST_ARG, "suggest request: text arg is not provided")
            return
        }

        UiThreadUtil.runOnUiThread {
            getSuggestClient().suggest(text, options,
                object : Callback<List<MapSuggestItem?>?> {
                    override fun invoke(arg: List<MapSuggestItem?>?) {
                        promise.resolve(_argsHelper.createSuggestsMapFrom(arg))
                    }
                },
                object : Callback<Throwable?> {
                    override fun invoke(arg: Throwable?) {
                        promise.reject(ERR_SUGGEST_FAILED, "suggest request: " + arg?.message)
                    }
                }
            )
        }
    }

    @ReactMethod
    fun reset() {
        UiThreadUtil.runOnUiThread { getSuggestClient().resetSuggest() }
    }

    private fun getSuggestClient(): MapSuggestClient {
        if (_suggestClient == null) {
            _suggestClient = YandexMapSuggestClient()
        }

        return _suggestClient as MapSuggestClient
    }

    companion object {
        private const val ERR_NO_REQUEST_ARG = "YANDEX_SUGGEST_ERR_NO_REQUEST_ARG"
        private const val ERR_SUGGEST_FAILED = "YANDEX_SUGGEST_ERR_SUGGEST_FAILED"
    }
}
