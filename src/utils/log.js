/**
 * Permission Map
 */
const permission = new Map([[0, "DEBUG"], [1, "ERROR"], [2, "DISABLE"]]);

/* !!
 * Logger Record
 * -------- -------- --------
 * Use Development Only
 * ======== ======== ========
 */
class Logger {
  /**
   * Permission Level: [0, 1, 2]
   */
  level;

  /**
   * In Production: Boolean
   */
  inProduction;

  /**
   * Show Production: Boolean
   */
  showProduction;

  // Logger Recoder
  constructor(
    // Default Permission Level is 0
    level = permission.get(0),
    // Default Not Show in Production
    showProduction = false
  ) {
    // Noop
    this.noop = function() {};

    // In node.js
    this.inServer = typeof window === "undefined";

    // In Production
    this.inProduction = process.env.NODE_ENV === "production";

    // Show Production
    this.showProduction = showProduction;

    // Set Permission Level
    this.level = level;

    // Style
    this.style = color =>
      `color: white; background: ${color}; border-radius: 2px; text-shadow: 0 -1px 1px rgba(0, 0, 0, .25); padding: 4px; font-weight: bold; font-size: 12px'`;
  }

  // Can Print in Environment
  can(method, allow = []) {
    // Full Mode
    if (this.level === permission.get(0) && this.inProduction === false) {
      allow = ["INFO", "WARN", "ERROR", "DEBUG"];
    }

    // Error Mode
    else if (
      this.level === permission.get(1) &&
      (this.inProduction === false || this.showProduction === true)
    ) {
      allow = ["ERROR"];
    }

    // Disable Mode
    else if (
      this.level === permission.get(2) ||
      (this.inProduction === true && this.showProduction === false)
    ) {
      allow = [];
    }

    // Check Method
    return !!~allow.indexOf(method);
  }

  /**
   * Print
   * -------- -------- --------
   * @param mode
   * @param color
   * @param message
   * @param tag
   * @param context
   * ======== ======== ========
   */
  print(mode, color, message, tag, context = "") {
    // Bind Console
    return (tag
      ? // Has Tag
        console[mode].bind(
          // Console
          window.console,

          // Prefix Info
          `%c${mode.toUpperCase()}%c %c` + tag + "%c " + message,
          // Prefix Color
          this.style(color),

          // Print Color
          "color: inherit",
          // Print Style
          this.style("gray"),

          // Context Weight
          "font-weight: bold",

          // Context Info
          context
        )
      : // No Tag
        console[mode].bind(
          // Console
          window.console,

          // Prefix Info
          `%c${mode.toUpperCase()}%c ${message}`,
          // Prefix Color
          this.style(color),

          // Context Weight
          "font-weight: bold",

          // Context Info
          context
        ))();
  }

  /**
   * Debug Level
   * -------- -------- --------
   * @param message
   * @param tag
   * @param context
   * ======== ======== ========
   */
  debug(message, tag, context) {
    if (!this.inServer && this.can("DEBUG")) {
      return this.print("debug", "grey", message, tag, context);
    }

    // Non Conformity
    return this.noop;
  }

  /**
   * Log Level
   * -------- -------- --------
   * @param message
   * @param tag
   * @param context
   * ======== ======== ========
   */
  log(message, tag, context) {
    // return this.info(message, tag, context);
    if (!this.inServer) {
      return this.print("log", "dimgray", message, tag, context);
    }

    // Non Conformity
    return this.noop;
  }

  /**
   * Success Level
   * -------- -------- --------
   * @param message
   * @param tag
   * @param context
   * ======== ======== ========
   */
  info(message, tag, context) {
    if (!this.inServer && this.can("DEBUG")) {
      return this.print("info", "green", message, tag, context);
    }

    // Non Conformity
    return this.noop;
  }

  /**
   * Warnning Level
   * -------- -------- --------
   * @param message
   * @param tag
   * @param context
   * ======== ======== ========
   */
  warn(message, tag, context) {
    if (!this.inServer && this.can("WARN")) {
      return this.print("warn", "orange", message, tag, context);
    }

    // Non Conformity
    return this.noop;
  }

  /**
   * Error Level
   * -------- -------- --------
   * @param message
   * @param tag
   * @param context
   * ======== ======== ========
   */
  error(message, tag, context) {
    if (!this.inServer && this.can("ERROR")) {
      return this.print("error", "red", message, tag, context);
    }

    // Non Conformity
    return this.noop;
  }
}

// Export
export default Logger;
