const CONTEXT = {
    form_data: {},
    sign_process: "none",
    autostart_timeout: 7,
    autostart_timer: 0.0,
    view: {},
    controllers: [] // view._layout should be CONTEXT.controllers instead
}

runtime_setup(CONTEXT);
runtime_execute(CONTEXT);