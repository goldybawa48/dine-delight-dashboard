import * as React from "react";
import { format, subDays, startOfDay, endOfDay } from "date-fns";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateRangePickerProps {
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  className?: string;
}

const presets = [
  { label: "7 Days", days: 7 },
  { label: "30 Days", days: 30 },
  { label: "90 Days", days: 90 },
];

export function DateRangePicker({
  dateRange,
  onDateRangeChange,
  className,
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activePreset, setActivePreset] = React.useState<number | null>(7);

  const handlePresetClick = (days: number) => {
    const to = endOfDay(new Date());
    const from = startOfDay(subDays(new Date(), days - 1));
    setActivePreset(days);
    onDateRangeChange({ from, to });
  };

  const handleCalendarSelect = (range: DateRange | undefined) => {
    setActivePreset(null);
    onDateRangeChange(range);
  };

  const getDisplayText = () => {
    if (activePreset) {
      return `Last ${activePreset} Days`;
    }
    if (dateRange?.from) {
      if (dateRange.to) {
        return `${format(dateRange.from, "MMM d")} - ${format(dateRange.to, "MMM d, yyyy")}`;
      }
      return format(dateRange.from, "MMM d, yyyy");
    }
    return "Select dates";
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Preset Buttons */}
      <div className="hidden sm:flex items-center gap-1 rounded-lg border border-border bg-card p-1">
        {presets.map((preset) => (
          <button
            key={preset.days}
            onClick={() => handlePresetClick(preset.days)}
            className={cn(
              "px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200",
              activePreset === preset.days
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Custom Date Range Picker */}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "justify-start text-left font-normal gap-2 min-w-[200px]",
              !dateRange && "text-muted-foreground",
              !activePreset && dateRange?.from && "border-primary/50 bg-primary/5"
            )}
          >
            <CalendarIcon className="h-4 w-4 text-primary" />
            <span className="flex-1">{getDisplayText()}</span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end" sideOffset={8}>
          <div className="flex flex-col">
            {/* Mobile Presets */}
            <div className="sm:hidden flex items-center gap-1 p-3 border-b border-border">
              {presets.map((preset) => (
                <button
                  key={preset.days}
                  onClick={() => {
                    handlePresetClick(preset.days);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "flex-1 px-2 py-1.5 text-xs font-medium rounded-md transition-all duration-200",
                    activePreset === preset.days
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted border border-border"
                  )}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Calendar Header */}
            <div className="p-3 border-b border-border bg-muted/30">
              <p className="text-sm font-medium text-foreground">Custom Range</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Select start and end dates
              </p>
            </div>

            {/* Calendar */}
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={handleCalendarSelect}
              numberOfMonths={2}
              disabled={(date) => date > new Date()}
              className="p-3 pointer-events-auto"
              classNames={{
                months: "flex flex-col sm:flex-row gap-4",
                month: "space-y-4",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: "text-sm font-semibold text-foreground",
                nav: "space-x-1 flex items-center",
                nav_button: cn(
                  "h-7 w-7 bg-transparent p-0 opacity-70 hover:opacity-100 hover:bg-muted rounded-md transition-colors"
                ),
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse",
                head_row: "flex",
                head_cell:
                  "text-muted-foreground rounded-md w-9 font-medium text-[0.75rem] uppercase",
                row: "flex w-full mt-1",
                cell: cn(
                  "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
                  "first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                ),
                day: cn(
                  "h-9 w-9 p-0 font-normal rounded-md transition-colors",
                  "hover:bg-muted aria-selected:opacity-100"
                ),
                day_range_start: "day-range-start bg-primary text-primary-foreground hover:bg-primary",
                day_range_end: "day-range-end bg-primary text-primary-foreground hover:bg-primary",
                day_selected:
                  "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                day_today: "bg-accent text-accent-foreground font-semibold",
                day_outside: "text-muted-foreground opacity-50",
                day_disabled: "text-muted-foreground opacity-30",
                day_range_middle:
                  "aria-selected:bg-primary/10 aria-selected:text-foreground",
                day_hidden: "invisible",
              }}
            />

            {/* Footer */}
            <div className="flex items-center justify-between p-3 border-t border-border bg-muted/30">
              <div className="text-xs text-muted-foreground">
                {dateRange?.from && dateRange?.to && (
                  <span>
                    {Math.ceil(
                      (dateRange.to.getTime() - dateRange.from.getTime()) /
                        (1000 * 60 * 60 * 24)
                    ) + 1}{" "}
                    days selected
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    handlePresetClick(7);
                  }}
                  className="text-xs"
                >
                  Reset
                </Button>
                <Button
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-xs"
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
