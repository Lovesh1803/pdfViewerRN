package com.shudhlovehost;

import android.app.Activity;
import android.view.WindowManager;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class ScreenShotPreventionModule extends ReactContextBaseJavaModule {

    public ScreenShotPreventionModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ScreenShotPrevention";  // Name of the Native Modules.
    }

    @ReactMethod
    public void forbidScreenshot(Promise promise) {
        Activity currentActivity = getCurrentActivity();
        if (currentActivity != null) {
            currentActivity.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    try {
                    currentActivity.getWindow().addFlags(WindowManager.LayoutParams.FLAG_SECURE);
                    promise.resolve("Done. Screenshot taking locked.");
                    } catch(Exception e) {
                    promise.reject("Forbid screenshot taking failure.");
                    }
                }
                });
        }
    }

  @ReactMethod
  public void allowScreenshot(Promise promise) {
    Activity currentActivity = getCurrentActivity();
    if (currentActivity != null) {
        currentActivity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                try {
                currentActivity.getWindow().clearFlags(WindowManager.LayoutParams.FLAG_SECURE);
                promise.resolve("Done. Screenshot taking unlocked.");
                } catch(Exception e) {
                promise.reject("Allow screenshot taking failure.");
                }
            }
            });
    }
  }
}