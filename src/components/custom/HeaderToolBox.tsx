import React from "react";

const HeaderToolBox = () => {
  return (
    <section>
      {/* for lock and unlock */}
      <div>
        {/* lock */}
        <i className="fa-solid fa-lock" />
        {/* unlock */}
        <i className="fa-solid fa-lock-open" />
      </div>

      {/* for square */}
      <div>
        <i className="fa-regular fa-square" />
      </div>

      {/* for circle */}
      <div>
        <i className="fa-regular fa-circle" />
      </div>

      {/* for arrow */}
      <div>
        <i className="fa-solid fa-arrow-right" />
      </div>

      {/* for line */}
      <div>
        <i className="fa-solid fa-minus" />
      </div>

      {/* for text */}
      <div>
        <i className="fa-solid fa-font" />
      </div>

      {/* for image */}
      <div>
        <i className="fa-regular fa-image" />
      </div>

      {/* for pencil */}
      <div>
        <i className="fa-solid fa-pencil" />
      </div>

      {/* for undo */}
      <div>
        <i className="fa-solid fa-rotate-left" />
      </div>

      {/* for redo */}
      <div>
        <i className="fa-solid fa-rotate-right" />
      </div>

      {/* for eraser */}
      <div>
        <i className="fa-solid fa-eraser" />
      </div>
    </section>
  );
};

export default HeaderToolBox;
