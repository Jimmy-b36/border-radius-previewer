import { type NextPage } from "next";

import { MutableRefObject, useRef, useState } from "react";
interface IBorderRadius {
  [key: string]: string;
  verticalTopLeft: string;
  horizontalTopLeft: string;
  horizontalTopRight: string;
  verticalTopRight: string;
  verticalBottomLeft: string;
  horizontalBottomLeft: string;
  horizontalBottomRight: string;
  verticalBottomRight: string;
}
const Home: NextPage = () => {
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  const mouseStartPosition = useRef<number>(0);
  const targetName = useRef<string>("");
  const [numStart, setNumStart] = useState<number>(0);

  const [borderRadius, setBorderRadius] = useState<IBorderRadius>({
    verticalTopLeft: "10",
    horizontalTopLeft: "10",
    horizontalTopRight: "10",
    verticalTopRight: "10",
    verticalBottomLeft: "10",
    horizontalBottomLeft: "10",
    horizontalBottomRight: "10",
    verticalBottomRight: "10",
  });

  const mouseDownHandler = (e: React.MouseEvent<HTMLInputElement>): void => {
    mouseStartPosition.current = e.pageY;
    setNumStart(Number(borderRadius[(e.target as HTMLFormElement).name]));
    setNumStart(isNaN(numStart) ? 0 : numStart);
    targetName.current = (e.target as HTMLFormElement).name;
    window.addEventListener("mousemove", mouseMoveHandler);
    window.addEventListener("mouseup", mouseUpHandler);
    return;
  };

  const mouseMoveHandler = (e: any): void => {
    const diff = mouseStartPosition.current - e.pageY;

    let newLeft = numStart + diff;

    newLeft = newLeft > 100 ? 100 : newLeft;
    newLeft = newLeft < 0 ? 0 : newLeft;
    //* bugFix: e.target changes when mouse moves outside of box on chrome
    setBorderRadius({
      ...borderRadius,
      [targetName.current]: newLeft.toString(),
    });
  };

  const mouseUpHandler = (): void => {
    window.removeEventListener("mousemove", mouseMoveHandler);
    window.removeEventListener("mouseup", mouseUpHandler);
    return;
  };

  const onChangeRadiusHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBorderRadius({
      ...borderRadius,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#182f55]">
      <div className="mb-4 flex h-10 w-96 justify-between ">
        <input
          type="text"
          value={borderRadius.horizontalTopLeft}
          className="z-10 h-7 w-8 cursor-ns-resize appearance-none rounded border border-black outline-none"
          name="horizontalTopLeft"
          onChange={onChangeRadiusHandler}
          onMouseDown={mouseDownHandler}
          min={0}
          max={100}
          inputMode={"none"}
        />
        <input
          type="text"
          value={borderRadius.horizontalTopRight}
          className="h-7 w-8 cursor-ns-resize appearance-none rounded border border-black"
          name="horizontalTopRight"
          onChange={onChangeRadiusHandler}
          onMouseDown={mouseDownHandler}
          min={0}
          max={100}
        />
      </div>

      <div className="flex flex-row">
        <div className="mr-5 grid flex-col content-between">
          <input
            type="text"
            value={borderRadius.verticalTopLeft}
            className="h-7 w-8 cursor-ns-resize rounded border border-black"
            name="verticalTopLeft"
            onChange={onChangeRadiusHandler}
            onMouseDown={mouseDownHandler}
            min={0}
            max={100}
          />
          <input
            type="text"
            value={borderRadius.verticalBottomLeft}
            className=" h-7 w-8 cursor-ns-resize rounded border border-black"
            name="verticalBottomLeft"
            onChange={onChangeRadiusHandler}
            onMouseDown={mouseDownHandler}
            min={0}
            max={100}
          />
        </div>

        <div
          className=" h-96 w-96 "
          style={{
            borderStartStartRadius: ` ${borderRadius.horizontalTopLeft}% ${borderRadius.verticalTopLeft}%`,
            borderStartEndRadius: `${borderRadius.horizontalTopRight}% ${borderRadius.verticalTopRight}%`,
            borderEndStartRadius: `${borderRadius.horizontalBottomLeft}% ${borderRadius.verticalBottomLeft}% `,
            borderEndEndRadius: `${borderRadius.horizontalBottomRight}% ${borderRadius.verticalBottomRight}%`,
            background: "linear-gradient(145deg, #1c3661, #172d52)",
            boxShadow: `12px 12px 23px #0a1424, -12px -12px 23px #2a5092`,
          }}
        ></div>
        <div className="ml-5 grid content-between">
          <input
            type="text"
            value={borderRadius.verticalTopRight}
            className="h-7 w-8 cursor-ns-resize rounded border border-black"
            name="verticalTopRight"
            onChange={onChangeRadiusHandler}
            onMouseDown={mouseDownHandler}
            min={0}
            max={100}
          />
          <input
            type="text"
            value={borderRadius.verticalBottomRight}
            className="h-7 w-8 cursor-ns-resize rounded border border-black"
            name="verticalBottomRight"
            onChange={onChangeRadiusHandler}
            onMouseDown={mouseDownHandler}
            min={0}
            max={100}
          />
        </div>
      </div>

      <div className="mt-5 flex h-10 w-96 justify-between ">
        <input
          type="text"
          value={borderRadius.horizontalBottomLeft}
          className="h-7 w-8 cursor-ns-resize rounded border border-black"
          name="horizontalBottomLeft"
          onChange={onChangeRadiusHandler}
          onMouseDown={mouseDownHandler}
          min={0}
          max={100}
        />
        <input
          type="text"
          value={borderRadius.horizontalBottomRight}
          className="h-7 w-8 cursor-ns-resize rounded border border-black"
          name="horizontalBottomRight"
          onChange={onChangeRadiusHandler}
          onMouseDown={mouseDownHandler}
          min={0}
          max={100}
        />
      </div>

      <p className="text-gray-100">
        border-radius: {borderRadius.horizontalTopLeft}%{" "}
        {borderRadius.horizontalTopRight}% {borderRadius.horizontalBottomRight}%{" "}
        {borderRadius.horizontalBottomLeft}% / {borderRadius.verticalTopLeft}%{" "}
        {borderRadius.verticalTopRight}% {borderRadius.verticalBottomRight}%{" "}
        {borderRadius.verticalBottomLeft}%
      </p>
      <button
        className="m-1 border border-black bg-gradient-to-r from-[#BCED0C] to-[#1ac929] p-3"
        onClick={() => {
          navigator.clipboard.writeText(
            `border-radius: ${borderRadius.horizontalTopLeft}% ${borderRadius.horizontalTopRight}% ${borderRadius.horizontalBottomRight}% ${borderRadius.horizontalBottomLeft}% / ${borderRadius.verticalTopLeft}% ${borderRadius.verticalTopRight}% ${borderRadius.verticalBottomRight}% ${borderRadius.verticalBottomLeft}%`
          );
          setCopySuccess(true);
        }}
        style={{
          borderStartStartRadius: `${borderRadius.horizontalTopLeft}% ${borderRadius.verticalTopLeft}% `,
          borderStartEndRadius: `${borderRadius.horizontalTopRight}% ${borderRadius.verticalTopRight}%`,
          borderEndStartRadius: `${borderRadius.horizontalBottomLeft}% ${borderRadius.verticalBottomLeft}% `,
          borderEndEndRadius: `${borderRadius.horizontalBottomRight}% ${borderRadius.verticalBottomRight}%`,
        }}
      >
        Copy to clipboard
      </button>
      {copySuccess && (
        <p className="bg-gradient-to-r from-[#BCED0C] to-[#1ac929] bg-clip-text text-4xl font-extrabold text-transparent">
          Copied to clipboard!
        </p>
      )}
      <p className="mt-5 text-gray-200">
        Made with 💚 by James Ball. Check out the repo{" "}
        <span>
          <a
            href="https://github.com/jimmy-btv/border-radius-previewer"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            here
          </a>
        </span>
      </p>
    </div>
  );
};

export default Home;
