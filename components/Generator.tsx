"use client";

import { useRef, useState } from "react";

const classes = [
  "NIGHT BUILDER",
  "SAND SHIPPER",
  "SIGNAL HACKER",
  "COASTAL CODER",
  "GLITCH ARCHITECT",
  "PALM STACKER",
  "RUNTIME NOMAD",
  "MONSOON MAKER",
  "TERMINAL DREAMER",
  "SUNSET SHIPPER",
];

type Mode = "id" | "pfp";

export default function Generator() {
  const input = useRef<HTMLInputElement>(null);

  const [photo, setPhoto] = useState<string>();
  const [mode, setMode] = useState<Mode>("id");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [handle, setHandle] = useState("");
  const [title, setTitle] = useState(classes[0]);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<string>();
  const [share, setShare] = useState<string>();

  const onFile = async (file?: File) => {
    if (!file) return;

    const valid =
      /^image\/(jpeg|png|webp|heic|heif)$/i.test(file.type) ||
      /\.(heic|heif)$/i.test(file.name);

    if (!valid) {
      alert("Please use JPG, PNG, WEBP or HEIC.");
      return;
    }

    try {
      let usableFile = file;

      /*
       * HEIC support.
       * If heic2any is installed, convert the image to JPEG.
       */
      if (
        file.type === "image/heic" ||
        file.type === "image/heif" ||
        /\.(heic|heif)$/i.test(file.name)
      ) {
        try {
          const mod = await import("heic2any");

          const converted = await mod.default({
            blob: file,
            toType: "image/jpeg",
            quality: 0.92,
          });

          const convertedBlob = Array.isArray(converted)
            ? converted[0]
            : converted;

          usableFile = new File(
            [convertedBlob],
            "photo.jpg",
            { type: "image/jpeg" }
          );
        } catch {
          alert(
            "This browser could not process the HEIC image. Please try JPG or PNG."
          );
          return;
        }
      }

      const url = URL.createObjectURL(usableFile);

      setPhoto(url);
      setResult(undefined);
      setShare(undefined);
    } catch {
      alert("This photo could not be read. Please try JPG or PNG.");
    }
  };

  const generate = async () => {
    if (!photo) {
      alert("Add a photo first.");
      return;
    }

    setBusy(true);
    setShare(undefined);

    try {
      /*
       * Load the uploaded image.
       */
      const img = new Image();

      img.src = photo;

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Image could not be loaded."));
      });

      /*
       * Main HH Goa canvas.
       */
      const canvas = document.createElement("canvas");

      const W = 1080;
      const H = mode === "id" ? 1350 : 1080;

      canvas.width = W;
      canvas.height = H;

      const ctx = canvas.getContext("2d");

      if (!ctx) {
        throw new Error("Canvas is not supported by this browser.");
      }

      /*
       * HH Goa visual system.
       *
       * The uploaded photo remains a normal photograph.
       * The branding comes from the fixed template.
       */
      const cream = "#F5F1E4";
      const ink = "#101312";
      const acid = "#CFFF3D";
      const orange = "#FF6B4A";
      const muted = "#68736C";

      /*
       * Background.
       */
      ctx.fillStyle = cream;
      ctx.fillRect(0, 0, W, H);

      /*
       * ------------------------------------------------
       * BUILDER ID
       * ------------------------------------------------
       */
      if (mode === "id") {
        const photoX = 54;
        const photoY = 190;
        const photoW = 972;
        const photoH = 720;

        /*
         * Automatically crop the uploaded photo
         * to the template's photo area.
         */
        const scale = Math.max(
          photoW / img.width,
          photoH / img.height
        );

        const sourceW = photoW / scale;
        const sourceH = photoH / scale;

        const sourceX = (img.width - sourceW) / 2;
        const sourceY = (img.height - sourceH) / 2;

        /*
         * Draw the original photo.
         *
         * No cyberpunk filter.
         * No color grading.
         * No face transformation.
         */
        ctx.drawImage(
          img,
          sourceX,
          sourceY,
          sourceW,
          sourceH,
          photoX,
          photoY,
          photoW,
          photoH
        );

        /*
         * Fixed HH Goa frame.
         */
        ctx.strokeStyle = ink;
        ctx.lineWidth = 3;
        ctx.strokeRect(photoX, photoY, photoW, photoH);

        ctx.strokeStyle = acid;
        ctx.lineWidth = 12;
        ctx.strokeRect(
          photoX - 7,
          photoY - 7,
          photoW + 14,
          photoH + 14
        );

        /*
         * Registration line.
         */
        ctx.strokeStyle = orange;
        ctx.lineWidth = 3;
        ctx.setLineDash([16, 10]);

        ctx.strokeRect(
          photoX + 18,
          photoY + 18,
          photoW - 36,
          photoH - 36
        );

        ctx.setLineDash([]);

        /*
         * HEADER
         */
        ctx.fillStyle = ink;
        ctx.font = "900 40px Arial";
        ctx.fillText("HH GOA", 54, 78);

        ctx.fillStyle = acid;
        ctx.fillRect(54, 96, 155, 12);

        ctx.fillStyle = ink;
        ctx.font = "700 20px monospace";
        ctx.fillText(
          "GOA, INDIA  ·  28—31 OCT 2026",
          54,
          137
        );

        ctx.fillStyle = orange;
        ctx.font = "700 19px monospace";
        ctx.fillText("BUILDER ID", 850, 78);

        /*
         * FOOTER
         */
        ctx.fillStyle = ink;
        ctx.fillRect(0, 950, W, 400);

        /*
         * Name.
         */
        ctx.fillStyle = cream;
        ctx.font = "900 66px Arial";

        const displayName =
          (name || "YOUR NAME")
            .toUpperCase()
            .slice(0, 18);

        ctx.fillText(displayName, 54, 1038);

        /*
         * Role.
         */
        ctx.fillStyle = acid;
        ctx.font = "700 26px monospace";

        const displayRole =
          (role || "BUILDER / CREATOR")
            .toUpperCase()
            .slice(0, 34);

        ctx.fillText(displayRole, 54, 1084);

        /*
         * Builder class.
         */
        ctx.fillStyle = cream;
        ctx.font = "700 25px monospace";
        ctx.fillText(title, 54, 1142);

        /*
         * Graphic line.
         */
        ctx.fillStyle = orange;
        ctx.fillRect(54, 1180, 235, 7);

        /*
         * Handle.
         */
        ctx.fillStyle = cream;
        ctx.font = "18px monospace";

        const displayHandle =
          (handle || "@YOURHANDLE")
            .toUpperCase()
            .slice(0, 28);

        ctx.fillText(displayHandle, 54, 1220);

        /*
         * HH Goa statement.
         */
        ctx.fillStyle = muted;
        ctx.font = "16px monospace";
        ctx.fillText(
          "LESS NOISE. MORE SIGNAL.",
          54,
          1280
        );

        /*
         * Hashtag.
         */
        ctx.fillStyle = acid;
        ctx.font = "700 18px monospace";
        ctx.fillText("#FRAMEINGOA", 855, 1280);

        /*
         * Graphic triangle.
         */
        ctx.fillStyle = acid;

        ctx.beginPath();
        ctx.moveTo(945, 995);
        ctx.lineTo(1018, 1068);
        ctx.lineTo(945, 1068);
        ctx.closePath();
        ctx.fill();

        /*
         * Registration marks.
         */
        ctx.strokeStyle = cream;
        ctx.lineWidth = 3;

        const marks = [
          [32, 160, 60, 160],
          [1020, 160, 1048, 160],
          [32, 920, 60, 920],
          [1020, 920, 1048, 920],
        ];

        marks.forEach(([x1, y1, x2, y2]) => {
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        });
      }

      /*
       * ------------------------------------------------
       * PFP FRAME
       * ------------------------------------------------
       */
      if (mode === "pfp") {
        const SIZE = 1080;

        /*
         * Background.
         */
        ctx.fillStyle = cream;
        ctx.fillRect(0, 0, SIZE, SIZE);

        /*
         * Photo circle.
         */
        const radius = 420;

        ctx.save();

        ctx.beginPath();
        ctx.arc(
          SIZE / 2,
          SIZE / 2,
          radius,
          0,
          Math.PI * 2
        );

        ctx.clip();

        const scale = Math.max(
          840 / img.width,
          840 / img.height
        );

        const sourceW = 840 / scale;
        const sourceH = 840 / scale;

        const sourceX = (img.width - sourceW) / 2;
        const sourceY = (img.height - sourceH) / 2;

        ctx.drawImage(
          img,
          sourceX,
          sourceY,
          sourceW,
          sourceH,
          120,
          120,
          840,
          840
        );

        ctx.restore();

        /*
         * Acid-green frame.
         */
        ctx.strokeStyle = acid;
        ctx.lineWidth = 18;

        ctx.beginPath();
        ctx.arc(
          SIZE / 2,
          SIZE / 2,
          radius,
          0,
          Math.PI * 2
        );

        ctx.stroke();

        /*
         * Outer border.
         */
        ctx.strokeStyle = ink;
        ctx.lineWidth = 5;

        ctx.strokeRect(
          45,
          45,
          990,
          990
        );

        /*
         * Header.
         */
        ctx.fillStyle = ink;
        ctx.font = "900 38px Arial";
        ctx.fillText("HH GOA", 54, 92);

        ctx.fillStyle = orange;
        ctx.font = "700 18px monospace";
        ctx.fillText(
          "#FRAMEINGOA",
          850,
          92
        );

        /*
         * Bottom label.
         */
        ctx.fillStyle = ink;
        ctx.font = "700 18px monospace";

        ctx.fillText(
          "GOA, INDIA · 2026",
          54,
          1030
        );
      }

      /*
       * Convert the canvas to PNG.
       */
      const blob = await new Promise<Blob>(
        (resolve, reject) => {
          canvas.toBlob(
            (generatedBlob) => {
              if (generatedBlob) {
                resolve(generatedBlob);
              } else {
                reject(
                  new Error("Could not create PNG.")
                );
              }
            },
            "image/png",
            1
          );
        }
      );

      /*
       * Show the generated image immediately.
       */
      const imageUrl = URL.createObjectURL(blob);

      setResult(imageUrl);

      /*
       * Send the generated image to the backend
       * to create a shareable HH Goa URL.
       */
      try {
        const formData = new FormData();

        formData.append(
          "image",
          blob,
          "hh-goa-frame.png"
        );

        formData.append(
          "name",
          name || "HH Goa Builder"
        );

        formData.append(
          "title",
          title
        );

        const response = await fetch(
          "/api/share",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();

        if (response.ok && data.url) {
          setShare(data.url);
        }
      } catch {
        /*
         * The image itself is still available for download
         * even if the share backend is unavailable.
         */
        setShare(undefined);
      }
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Could not generate the HH Goa frame."
      );
    } finally {
      setBusy(false);
    }
  };

  const caption =
    `I just got my HH Goa 2026 Builder ID ⚡ ` +
    `${name || "Ready to ship."} #FrameInGoa`;

  const doShare = async () => {
    if (!share) {
      return;
    }

    /*
     * Native mobile share.
     */
    const navigatorWithShare = navigator as Navigator & {
      share?: (data: {
        title?: string;
        text?: string;
        url?: string;
      }) => Promise<void>;
    };

    if (navigatorWithShare.share) {
      try {
        await navigatorWithShare.share({
          title: "HH Goa 2026",
          text: caption,
          url: share,
        });

        return;
      } catch {
        /*
         * User cancelled share sheet.
         * Fall through to X.
         */
      }
    }

    /*
     * Desktop fallback.
     */
    const xUrl =
      "https://twitter.com/intent/tweet?text=" +
      encodeURIComponent(caption) +
      "&url=" +
      encodeURIComponent(share);

    window.open(
      xUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section className="appgrid">
      <aside className="panel controls">
        <div className="head">
          <span>01 / BUILD YOUR ID</span>

          <span className="live">
            ● LIVE
          </span>
        </div>

        <div className="tabs">
          <button
            className={
              mode === "id"
                ? "active"
                : ""
            }
            onClick={() => setMode("id")}
            type="button"
          >
            BUILDER ID
          </button>

          <button
            className={
              mode === "pfp"
                ? "active"
                : ""
            }
            onClick={() => setMode("pfp")}
            type="button"
          >
            PFP FRAME
          </button>
        </div>

        <label
          className="upload"
          onDragOver={(event) =>
            event.preventDefault()
          }
          onDrop={(event) => {
            event.preventDefault();

            const droppedFile =
              event.dataTransfer.files[0];

            onFile(droppedFile);
          }}
        >
          <input
            ref={input}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
            onChange={(event) =>
              onFile(
                event.target.files?.[0]
              )
            }
          />

          <b>
            ＋ ADD YOUR PHOTO
          </b>

          <small>
            JPG · PNG · WEBP · HEIC
          </small>

          <span>
            YOUR PHOTO STAYS A PHOTO.
            THE HH GOA TEMPLATE DOES THE REST.
          </span>
        </label>

        {mode === "id" && (
          <div className="fields">
            <label>
              NAME

              <input
                maxLength={28}
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                placeholder="Your name"
              />
            </label>

            <label>
              STACK / ROLE

              <input
                maxLength={32}
                value={role}
                onChange={(event) =>
                  setRole(event.target.value)
                }
                placeholder="Builder · Designer · Founder"
              />
            </label>

            <label>
              HANDLE

              <input
                maxLength={28}
                value={handle}
                onChange={(event) =>
                  setHandle(event.target.value)
                }
                placeholder="@yourhandle"
              />
            </label>
          </div>
        )}

        <div className="row">
          <button
            className="ghost"
            type="button"
            onClick={() =>
              setTitle(
                classes[
                  Math.floor(
                    Math.random() *
                      classes.length
                  )
                ]
              )
            }
          >
            ↯ NEW BUILDER CLASS
          </button>

          <span>
            {title}
          </span>
        </div>

        <button
          className="primary"
          type="button"
          onClick={generate}
          disabled={busy}
        >
          {busy
            ? "BUILDING YOUR ID…"
            : "MAKE MY HH GOA FRAME ↗"}
        </button>

        <p className="micro">
          One photo in. One HH Goa graphic
          out. No login.
        </p>
      </aside>

      <section className="panel output">
        <div className="head">
          <span>
            02 / YOUR HH GOA ID
          </span>

          <span>
            {result
              ? "READY TO SHIP"
              : "ADD A PHOTO"}
          </span>
        </div>

        <div className="preview">
          {result ? (
            <img
              src={result}
              alt="Generated HH Goa 2026 Builder ID"
            />
          ) : (
            <div>
              <strong>
                HH GOA
              </strong>

              <p>
                Upload a photo and we'll
                place it into the fixed HH
                Goa 2026 template.
              </p>
            </div>
          )}
        </div>

        <div className="actions">
          <a
            className={
              !result
                ? "disabled"
                : ""
            }
            href={result || "#"}
            download="hh-goa-builder-id.png"
            onClick={(event) => {
              if (!result) {
                event.preventDefault();
              }
            }}
          >
            ↓ DOWNLOAD IMAGE
          </a>

          <button
            type="button"
            disabled={!share || busy}
            onClick={doShare}
          >
            𝕏 SHARE TO X
          </button>
        </div>

        {share && (
          <p className="shareurl">
            SHAREABLE ·{" "}
            <a
              href={share}
              target="_blank"
              rel="noreferrer"
            >
              OPEN YOUR ID ↗
            </a>
          </p>
        )}
      </section>
    </section>
  );
}
