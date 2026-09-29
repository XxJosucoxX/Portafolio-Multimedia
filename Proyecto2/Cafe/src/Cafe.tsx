import { useState } from "react";

type Vista = "bienvenida" | "menu" | "login";

const estilos = `
  * { box-sizing: border-box; }
  html { min-width: 320px; }
  #root { width: 100%; max-width: none; min-height: 100svh; margin: 0; padding: 0; border: 0; text-align: left; }
  body { display: block; min-width: 320px; margin: 0; font-family: Arial, Helvetica, sans-serif; background: #eee8e1; color: #35251d; }
  button, input { font: inherit; }
  .pantalla { min-height: 100svh; width: 100%; margin: auto; background: #fffaf5; display: flex; flex-direction: column; box-shadow: 0 14px 45px #39231a24; }
  .panel { flex: 1; display: flex; flex-direction: column; min-width: 0; }
  .imagen { position: relative; min-height: 38svh; max-height: 410px; overflow: hidden; background: #6a4430 url('https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1100&q=85') center / cover no-repeat; border-radius: 0 0 48% 48% / 0 0 8% 8%; }
  .imagen::after { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, #24140c79 0%, transparent 55%, #24140c35 100%); }
  .marca { position: absolute; z-index: 1; top: 22px; left: 26px; display: flex; align-items: center; gap: 9px; color: white; font-size: 14px; font-weight: 800; letter-spacing: .09em; }
  .icono { width: 28px; height: 28px; }
  .sello { position: absolute; z-index: 1; left: 27px; bottom: 32px; color: #fff; font-size: 12px; font-weight: 700; letter-spacing: .19em; text-transform: uppercase; }
  .contenido { flex: 1; display: flex; flex-direction: column; justify-content: center; text-align: center; padding: 28px 31px 18px; }
  .linea { width: 34px; height: 4px; margin: 0 auto 22px; border-radius: 5px; background: #f26b12; }
  .pantalla h1 { font-family: Arial, Helvetica, sans-serif; font-weight: 800; margin: 0; color: #52301f; font-size: clamp(31px, 8vw, 41px); line-height: 1.08; letter-spacing: -.045em; }
  .titulo-linea { display: block; }
  .descripcion { max-width: 340px; margin: 22px auto 0; color: #6c5a50; font-size: 16px; line-height: 1.55; }
  .acciones { padding: 15px 26px max(29px, env(safe-area-inset-bottom)); text-align: center; }
  .principal { width: 100%; min-height: 58px; padding: 14px; border: 0; border-radius: 18px; background: #f36b10; color: white; font-weight: 800; font-size: 16px; letter-spacing: .035em; box-shadow: 0 8px 16px #ef6a1840; cursor: pointer; }
  .principal:hover { background: #da5908; }
  .principal:focus-visible, .enlace:focus-visible, .volver:focus-visible, input:focus-visible { outline: 3px solid #70402b; outline-offset: 3px; }
  .cuenta { margin: 20px 0 0; font-size: 14px; color: #625149; }
  .enlace, .volver { border: 0; background: none; color: #6b3a22; text-decoration: underline; font-weight: 700; cursor: pointer; }
  .volver { align-self: flex-start; margin: 25px 28px 0; }
  .tarjeta { text-align: left; padding: 20px; margin: 28px 0 0; border-radius: 19px; background: #f6eadf; }
  .tarjeta h2 { margin: 0 0 8px; font-size: 20px; }
  .tarjeta p { margin: 0; line-height: 1.5; }
  .campo { width: 100%; padding: 15px; margin-top: 13px; border: 1px solid #d5bdab; border-radius: 12px; background: #fff; }
  .formulario { margin-top: 25px; text-align: left; }
  .formulario label { display: block; margin-top: 10px; font-size: 14px; font-weight: 700; }
  .formulario .principal { margin-top: 23px; }
  @media (max-height: 690px) { .imagen { min-height: 32svh; } .contenido { padding-top: 18px; } .descripcion { margin-top: 12px; } }
  @media (min-width: 900px) {
    body { background: #eee8e1; }
    .pantalla { width: 100%; max-width: none; min-height: 100svh; display: grid; grid-template-columns: minmax(0, 48fr) minmax(0, 52fr); box-shadow: none; }
    .imagen { min-width: 0; min-height: 100svh; max-height: none; border-radius: 0 40px 40px 0; background-position: center; }
    .marca { top: 38px; left: 44px; font-size: 17px; }
    .sello { left: 48px; bottom: 48px; font-size: 14px; }
    .panel { justify-content: center; padding: 56px clamp(32px, 4vw, 88px); }
    .contenido { flex: 0 1 auto; width: 100%; max-width: 560px; margin: 0 auto; align-items: flex-start; text-align: left; padding: 0; }
    .linea { margin: 0 0 30px; width: 48px; }
    .pantalla h1 { font-size: clamp(36px, 3.2vw, 62px); line-height: 1.12; letter-spacing: -.04em; }
    .titulo-linea { display: block; white-space: nowrap; }
    .descripcion { max-width: 480px; margin: 28px 0 0; font-size: 19px; }
    .acciones { width: 100%; max-width: 560px; margin: 0 auto; padding: 36px 0 0; text-align: left; }
    .acciones .principal { max-width: 430px; }
    .principal { min-height: 64px; }
    .cuenta { max-width: 430px; text-align: center; }
    .volver { margin: 0 0 45px; padding: 0; }
    .tarjeta, .formulario { width: min(100%, 430px); }
  }
  @media (min-width: 900px) and (max-height: 650px) {
    .imagen { min-height: 100svh; }
    .panel { padding-top: 24px; padding-bottom: 24px; }
    .acciones { padding-top: 20px; }
    .descripcion { margin-top: 16px; }
  }
`;

export default function CafeArabica() {
  const [vista, setVista] = useState<Vista>("bienvenida");

  return (
    <>
      <style>{estilos}</style>
      <main className="pantalla">
        <header className="imagen" aria-label="Fotografía de café artesanal">
          <div className="marca">
            <svg className="icono" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <path d="M4 11h19v10a8 8 0 0 1-8 8h-3a8 8 0 0 1-8-8V11Zm19 2h3a4 4 0 0 1 0 8h-3M3 29h23M12 3c-3 2 2 3-1 6m8-6c-3 2 2 3-1 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            CAFÉ ARÁBICA
          </div>
          <span className="sello">Un momento para disfrutar</span>
        </header>

        <div className="panel">
        {vista === "bienvenida" ? (
          <>
            <section className="contenido">
              <span className="linea" aria-hidden="true" />
              <h1><span className="titulo-linea">¡Bienvenido a</span><span className="titulo-linea">Café Arábica!</span></h1>
              <p className="descripcion">Disfruta del mejor café artesanal, postres y promociones exclusivas. Pide desde la app y recoge en tienda.</p>
            </section>
            <div className="acciones">
              <button className="principal" onClick={() => setVista("menu")}>EMPEZAR AHORA</button>
              <p className="cuenta">¿Ya tienes cuenta? <button className="enlace" onClick={() => setVista("login")}>Iniciar sesión</button></p>
            </div>
          </>
        ) : (
          <>
            <button className="volver" onClick={() => setVista("bienvenida")}>← Volver</button>
            <section className="contenido">
              <span className="linea" aria-hidden="true" />
              {vista === "menu" ? (
                <>
                  <h1>Tu próxima pausa<br />empieza aquí.</h1>
                  <p className="descripcion">Explora nuestros favoritos y elige algo rico para recoger en tienda.</p>
                  <div className="tarjeta"><h2>☕ Café de la casa</h2><p>Un espresso aromático, preparado al momento.</p></div>
                </>
              ) : (
                <>
                  <h1>Qué gusto<br />verte de nuevo.</h1>
                  <form className="formulario" onSubmit={(evento) => { evento.preventDefault(); alert("Inicio de sesión de demostración"); }}>
                    <label htmlFor="correo">Correo electrónico</label>
                    <input className="campo" id="correo" type="email" autoComplete="email" required placeholder="tu@correo.com" />
                    <label htmlFor="clave">Contraseña</label>
                    <input className="campo" id="clave" type="password" autoComplete="current-password" required placeholder="Tu contraseña" />
                    <button className="principal" type="submit">INICIAR SESIÓN</button>
                  </form>
                </>
              )}
            </section>
          </>
        )}
        </div>
      </main>
    </>
  );
}
