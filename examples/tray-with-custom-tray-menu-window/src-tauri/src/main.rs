#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::Manager;
use tauri_plugin_positioner::{WindowExt, Position};

#[tauri::command]
fn move_window(app: tauri::AppHandle, window_label: String) {
    if let Some(win) = app.get_window(&window_label) {
        let _ = win.move_window(Position::TrayBottomCenter);
    } else {
        eprintln!("Window with label '{}' not found", window_label);
    }
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_positioner::init())
        .invoke_handler(tauri::generate_handler![move_window])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
