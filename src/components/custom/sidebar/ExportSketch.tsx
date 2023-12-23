import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IMAGE_EXPORT_FORMAT } from "@/constants/constants";
import { IExportData } from "@/helper/interface/interface";
import { useAppSelector } from "@/hooks/redux";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const ExportSketch = () => {
  const { canvas } = useAppSelector((state) => state.canvas);
  // for filename and filetype data
  const [exportData, setExportData] = useState<IExportData>({
    fileName: "canvas_artwork",
    fileType: "image/png",
  });
  const [isOpen, setIsOpen] = useState(false);

  // function to handle canvas data export
  const exportCanvasData = () => {
    if (!canvas) return;
    if (!exportData?.fileName || !exportData?.fileType) return;

    // Get the data URL of the canvas
    const dataURL = canvas.toDataURL(exportData?.fileType);

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = exportData?.fileName;

    // Append the link to the body and trigger a click to start the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setIsOpen(false);
    setExportData(IMAGE_EXPORT_FORMAT[0]);
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className="w-full">
          <Button
            variant={"outline"}
            className="hover:bg-mainSecondary w-full flex items-center justify-start gap-2"
          >
            <i className="fa-solid fa-download" /> <p>Export sketch</p>
          </Button>
        </DialogTrigger>
        <DialogContent className="w-80 sm:w-96">
          <DialogHeader className="space-y-5">
            <DialogTitle>Export your artwork</DialogTitle>
            <DialogDescription className="flex flex-col gap-5">
              {/* for file name */}
              <Label className="text-left">
                File name
                <Input
                  type="text"
                  className="mt-2"
                  value={exportData?.fileName}
                  placeholder="File name"
                  onChange={(event) =>
                    setExportData({
                      ...exportData,
                      fileName: event?.target?.value,
                    })
                  }
                />
              </Label>

              {/* for file type */}
              <Label>
                <p className="mb-2 text-left">File type</p>
                <Select
                  value={exportData?.fileType}
                  onValueChange={(value) =>
                    setExportData({ ...exportData, fileType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose file type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>File types</SelectLabel>
                      {IMAGE_EXPORT_FORMAT &&
                        IMAGE_EXPORT_FORMAT.map((file: IExportData) => {
                          return (
                            <SelectItem key={uuidv4()} value={file?.fileType}>
                              {file?.fileName}
                            </SelectItem>
                          );
                        })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Label>
            </DialogDescription>
            <DialogFooter>
              <Button
                disabled={!exportData?.fileName || !exportData?.fileType}
                className="w-full"
                onClick={() => exportCanvasData()}
              >
                Export
              </Button>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExportSketch;
