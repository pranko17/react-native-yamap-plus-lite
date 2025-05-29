package ru.vvdev.yamap

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class RNYamapModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private var implementation = RNYamapImpl(reactContext)

    override fun getName(): String {
        return RNYamapImpl.NAME
    }

    override fun getConstants(): Map<String, Any> {
        return implementation.getConstants()
    }

    @ReactMethod
    fun init(apiKey: String?, promise: Promise) {
        implementation.init(apiKey, promise)
    }

    @ReactMethod
    fun setLocale(locale: String?, promise: Promise) {
        implementation.setLocale(locale, promise)
    }

    @ReactMethod
    fun getLocale(promise: Promise) {
        implementation.getLocale(promise)
    }

    @ReactMethod
    fun resetLocale(promise: Promise) {
        implementation.resetLocale(promise)
    }
}
