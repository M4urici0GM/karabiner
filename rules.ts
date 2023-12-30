import fs from "fs";
import { KarabinerRules } from "./types";
import { createHyperSubLayers, remap } from "./utils";

const rules: KarabinerRules[] = [
    // Define the Hyper key itself
    {
        description: "Hyper Key (⌃⌥⇧⌘)",
        manipulators: [
            {
                description: "Caps Lock -> Hyper Key",
                from: {
                    key_code: "caps_lock",
                },
                to: [
                    {
                        key_code: "left_shift",
                        modifiers: ["left_command", "left_control", "left_option"],
                    },
                ],
                to_if_alone: [
                    {
                        key_code: "escape",
                    },
                ],
                type: "basic",
            },
        ],
    },
    ...createHyperSubLayers({
        // v = "moVe" which isn't "m" because we want it to be on the left hand
        // so that hjkl work like they do in vim
        h: remap("left_arrow"),
        j: remap("down_arrow"),
        k: remap("up_arrow"),
        l: remap("up_arrow"),
        u: remap("home"),
        i: remap("end"),
        // c = Musi*c* which isn't "m" because we want it to be on the left hand
        c: {
            p: remap("play_or_pause"),
            n: remap("fastforward"),
            b: remap("rewind"),
        },
        s: {
            u: remap("volume_increment",),
            j: remap("volume_decrement",),
            i: remap("display_brightness_increment",),
            k: remap("display_brightness_decrement",),
            l: remap("q", ["right_control", "right_command"]),
        },

    }),
];

fs.writeFileSync(
    "karabiner.json",
    JSON.stringify(
        {
            global: {
                show_in_menu_bar: false,
            },
            profiles: [
                {
                    name: "Default",
                    complex_modifications: {
                        rules,
                    },
                },
            ],
        },
        null,
        2
    )
);
