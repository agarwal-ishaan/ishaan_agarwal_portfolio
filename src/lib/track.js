// GoatCounter custom-event helper.
// The script in index.html loads async and may be blocked or absent
// (e.g. localhost, ad blockers) — always guard.
export const track = (path) => {
  if (window.goatcounter?.count) {
    window.goatcounter.count({ path, title: path, event: true });
  }
};
