package ru.vvdev.yamap

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext

class RNYamapModule(reactContext: ReactApplicationContext) : NativeYamapModuleSpec(reactContext) {

    private var implementation = RNYamapImpl(reactContext)

    override fun getName(): String {
        return RNYamapImpl.NAME
    }

    override fun getConstants(): Map<String, Any> {
        return implementation.getConstants()
    }

    override fun init(apiKey: String?, promise: Promise) {
        implementation.init(apiKey, promise)
    }

    override fun setLocale(locale: String?, promise: Promise) {
        implementation.setLocale(locale, promise)
    }

    override fun getLocale(promise: Promise) {
        implementation.getLocale(promise)
    }

    override fun resetLocale(promise: Promise) {
        implementation.resetLocale(promise)
    }
}
