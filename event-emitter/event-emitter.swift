import Foundation
import AppKit

let notifcations = [
    NSWorkspace.willSleepNotification,
    NSWorkspace.didWakeNotification,
    // haven't observed these yet in practice, even when screen goes to sleep
    NSWorkspace.screensDidSleepNotification,
    NSWorkspace.screensDidWakeNotification,
    // helpful for testing as it triggers simply by switching apps
    // NSWorkspace.didActivateApplicationNotification
];

notifcations.forEach { notificationName in
    NSWorkspace.shared.notificationCenter.addObserver(forName: notificationName, object: nil, queue: OperationQueue.current) { (notification) in
        let metadata: [String: Any] = [
            "name": notificationName.rawValue,
            "time": round(Date().timeIntervalSince1970 * 1000)
        ]
        let jsonData = try! JSONSerialization.data(withJSONObject: metadata, options: JSONSerialization.WritingOptions.sortedKeys)
        if let JSONString = String(data: jsonData, encoding: String.Encoding.utf8) {
            print(JSONString)
            fflush(stdout) // required when using Runloop.run();
        }
        
    }
}

RunLoop.main.run()

