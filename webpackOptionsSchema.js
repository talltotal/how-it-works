const configs = {
  "additionalProperties": false,
  "definitions": {
    "common.arrayOfStringOrStringArrayValues": {
      "items": {
        "description": "string or array of strings",
        "anyOf": [
          {
            "minLength": 1,
            "type": "string"
          },
          {
            "items": {
              "description": "A non-empty string",
              "minLength": 1,
              "type": "string"
            },
            "type": "array"
          }
        ]
      },
      "type": "array"
    },
    "common.arrayOfStringValues": {
      "items": {
        "description": "A non-empty string",
        "minLength": 1,
        "type": "string"
      },
      "type": "array"
    },
    "common.nonEmptyArrayOfUniqueStringValues": {
      "items": {
        "description": "A non-empty string",
        "minLength": 1,
        "type": "string"
      },
      "minItems": 1,
      "type": "array",
      "uniqueItems": true
    },
    "entry": {
      "oneOf": [
        {
          "minProperties": 1,
          "additionalProperties": {
            "description": "An entry point with name",
            "oneOf": [
              {
                "description": "The string is resolved to a module which is loaded upon startup.",
                "minLength": 1,
                "type": "string"
              },
              {
                "description": "All modules are loaded upon startup. The last one is exported.",
                "anyOf": [
                  {
                    "$ref": "#/definitions/common.nonEmptyArrayOfUniqueStringValues"
                  }
                ]
              }
            ]
          },
          "description": "Multiple entry bundles are created. The key is the chunk name. The value can be a string or an array.",
          "type": "object"
        },
        {
          "description": "An entry point without name. The string is resolved to a module which is loaded upon startup.",
          "minLength": 1,
          "type": "string"
        },
        {
          "description": "An entry point without name. All modules are loaded upon startup. The last one is exported.",
          "anyOf": [
            {
              "$ref": "#/definitions/common.nonEmptyArrayOfUniqueStringValues"
            }
          ]
        },
        {
          "description": "A Function returning an entry object, an entry string, an entry array or a promise to these things.",
          "instanceof": "Function"
        }
      ]
    },
    "externals": {
      "anyOf": [
        {
          "description": "An exact matched dependency becomes external. The same string is used as external dependency.",
          "type": "string"
        },
        {
          "additionalProperties": {
            "description": "The dependency used for the external",
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "object"
              },
              {
                "type": "boolean"
              }
            ]
          },
          "description": "If an dependency matches exactly a property of the object, the property value is used as dependency.",
          "type": "object"
        },
        {
          "description": "`function(context, request, callback(err, result))` The function is called on each dependency.",
          "instanceof": "Function"
        },
        {
          "description": "Every matched dependency becomes external.",
          "instanceof": "RegExp"
        },
        {
          "items": {
            "description": "External configuration",
            "anyOf": [
              {
                "$ref": "#/definitions/externals"
              }
            ]
          },
          "type": "array"
        }
      ]
    },
    "module": {
      "additionalProperties": false,
      "properties": {
        "exprContextCritical": {
          "description": "Enable warnings for full dynamic dependencies",
          "type": "boolean"
        },
        "exprContextRecursive": {
          "description": "Enable recursive directory lookup for full dynamic dependencies",
          "type": "boolean"
        },
        "exprContextRegExp": {
          "description": "Sets the default regular expression for full dynamic dependencies",
          "anyOf": [
            {
              "type": "boolean"
            },
            {
              "instanceof": "RegExp"
            }
          ]
        },
        "exprContextRequest": {
          "description": "Set the default request for full dynamic dependencies",
          "type": "string"
        },
        "loaders": {
          "description": "An array of automatically applied loaders.",
          "anyOf": [
            {
              "$ref": "#/definitions/ruleSet-rules"
            }
          ]
        },
        "noParse": {
          "description": "Don't parse files matching. It's matched against the full resolved request.",
          "anyOf": [
            {
              "items": {
                "description": "A regular expression, when matched the module is not parsed",
                "instanceof": "RegExp"
              },
              "minItems": 1,
              "type": "array"
            },
            {
              "instanceof": "RegExp"
            },
            {
              "instanceof": "Function"
            },
            {
              "items": {
                "description": "An absolute path, when the module starts with this path it is not parsed",
                "type": "string",
                "absolutePath": true
              },
              "minItems": 1,
              "type": "array"
            },
            {
              "type": "string",
              "absolutePath": true
            }
          ]
        },
        "rules": {
          "allOf": [
            {
              "$ref": "#/definitions/ruleSet-rules"
            }
          ],
          "description": "An array of rules applied for modules."
        },
        "unknownContextCritical": {
          "description": "Enable warnings when using the require function in a not statically analyse-able way",
          "type": "boolean"
        },
        "unknownContextRecursive": {
          "description": "Enable recursive directory lookup when using the require function in a not statically analyse-able way",
          "type": "boolean"
        },
        "unknownContextRegExp": {
          "description": "Sets the regular expression when using the require function in a not statically analyse-able way",
          "anyOf": [
            {
              "type": "boolean"
            },
            {
              "instanceof": "RegExp"
            }
          ]
        },
        "unknownContextRequest": {
          "description": "Sets the request when using the require function in a not statically analyse-able way",
          "type": "string"
        },
        "unsafeCache": {
          "description": "Cache the resolving of module requests",
          "anyOf": [
            {
              "type": "boolean"
            },
            {
              "instanceof": "Function"
            }
          ]
        },
        "wrappedContextCritical": {
          "description": "Enable warnings for partial dynamic dependencies",
          "type": "boolean"
        },
        "wrappedContextRecursive": {
          "description": "Enable recursive directory lookup for partial dynamic dependencies",
          "type": "boolean"
        },
        "wrappedContextRegExp": {
          "description": "Set the inner regular expression for partial dynamic dependencies",
          "instanceof": "RegExp"
        },
        "strictExportPresence": {
          "description": "Emit errors instead of warnings when imported names don't exist in imported module",
          "type": "boolean"
        },
        "strictThisContextOnImports": {
          "description": "Handle the this context correctly according to the spec for namespace objects",
          "type": "boolean"
        }
      },
      "type": "object"
    },
    "output": {
      "additionalProperties": false,
      "properties": {
        "auxiliaryComment": {
          "description": "Add a comment in the UMD wrapper.",
          "anyOf": [
            {
              "description": "Append the same comment above each import style.",
              "type": "string"
            },
            {
              "additionalProperties": false,
              "description": "Set explicit comments for `commonjs`, `commonjs2`, `amd`, and `root`.",
              "properties": {
                "amd": {
                  "description": "Set comment for `amd` section in UMD",
                  "type": "string"
                },
                "commonjs": {
                  "description": "Set comment for `commonjs` (exports) section in UMD",
                  "type": "string"
                },
                "commonjs2": {
                  "description": "Set comment for `commonjs2` (module.exports) section in UMD",
                  "type": "string"
                },
                "root": {
                  "description": "Set comment for `root` (global variable) section in UMD",
                  "type": "string"
                }
              },
              "type": "object"
            }
          ]
        },
        "chunkFilename": {
          "description": "The filename of non-entry chunks as relative path inside the `output.path` directory.",
          "anyOf": [
            {
              "type": "string"
            },
            {
              "instanceof": "Function"
            }
          ],
          "absolutePath": false
        },
        "crossOriginLoading": {
          "description": "This option enables cross-origin loading of chunks.",
          "enum": [
            false,
            "anonymous",
            "use-credentials"
          ]
        },
        "jsonpScriptType": {
          "description": "This option enables loading async chunks via a custom script type, such as script type=\"module\"",
          "enum": [
            "text/javascript",
            "module"
          ]
        },
        "chunkLoadTimeout": {
          "description": "Number of milliseconds before chunk request expires",
          "type": "number"
        },
        "devtoolFallbackModuleFilenameTemplate": {
          "description": "Similar to `output.devtoolModuleFilenameTemplate`, but used in the case of duplicate module identifiers.",
          "anyOf": [
            {
              "type": "string"
            },
            {
              "instanceof": "Function"
            }
          ]
        },
        "devtoolLineToLine": {
          "description": "Enable line to line mapped mode for all/specified modules. Line to line mapped mode uses a simple SourceMap where each line of the generated source is mapped to the same line of the original source. It’s a performance optimization. Only use it if your performance need to be better and you are sure that input lines match which generated lines.",
          "anyOf": [
            {
              "description": "`true` enables it for all modules (not recommended)",
              "type": "boolean"
            },
            {
              "description": "An object similar to `module.loaders` enables it for specific files.",
              "type": "object"
            }
          ]
        },
        "devtoolModuleFilenameTemplate": {
          "description": "Filename template string of function for the sources array in a generated SourceMap.",
          "anyOf": [
            {
              "type": "string"
            },
            {
              "instanceof": "Function"
            }
          ]
        },
        "filename": {
          "description": "Specifies the name of each output file on disk. You must **not** specify an absolute path here! The `output.path` option determines the location on disk the files are written to, filename is used solely for naming the individual files.",
          "anyOf": [
            {
              "type": "string"
            },
            {
              "instanceof": "Function"
            }
          ],
          "absolutePath": false
        },
        "hashDigest": {
          "description": "Digest type used for the hash",
          "enum": [
            "latin1",
            "hex",
            "base64"
          ]
        },
        "hashDigestLength": {
          "description": "Number of chars which are used for the hash",
          "minimum": 1,
          "type": "number"
        },
        "hashFunction": {
          "description": "Algorithm used for generation the hash (see node.js crypto package)",
          "minLength": 1,
          "type": "string"
        },
        "hashSalt": {
          "description": "Any string which is added to the hash to salt it",
          "minLength": 1,
          "type": "string"
        },
        "hotUpdateChunkFilename": {
          "description": "The filename of the Hot Update Chunks. They are inside the output.path directory.",
          "anyOf": [
            {
              "type": "string"
            },
            {
              "instanceof": "Function"
            }
          ],
          "absolutePath": false
        },
        "hotUpdateFunction": {
          "description": "The JSONP function used by webpack for async loading of hot update chunks.",
          "type": "string"
        },
        "hotUpdateMainFilename": {
          "description": "The filename of the Hot Update Main File. It is inside the `output.path` directory.",
          "anyOf": [
            {
              "type": "string"
            },
            {
              "instanceof": "Function"
            }
          ],
          "absolutePath": false
        },
        "jsonpFunction": {
          "description": "The JSONP function used by webpack for async loading of chunks.",
          "type": "string"
        },
        "library": {
          "anyOf": [
            {
              "type": "string"
            },
            {
              "items": {
                "description": "A part of the library name",
                "type": "string"
              },
              "type": "array"
            },
            {
              "type": "object",
              "additionalProperties": false,
              "properties": {
                "root": {
                  "description": "Name of the property exposed globally by a UMD library",
                  "type": "string"
                },
                "amd": {
                  "description": "Name of the exposed AMD library in the UMD",
                  "type": "string"
                },
                "commonjs": {
                  "description": "Name of the exposed commonjs export in the UMD",
                  "type": "string"
                }
              }
            }
          ],
          "description": "If set, export the bundle as library. `output.library` is the name."
        },
        "libraryTarget": {
          "description": "Type of library",
          "enum": [
            "var",
            "assign",
            "this",
            "window",
            "global",
            "commonjs",
            "commonjs2",
            "commonjs-module",
            "amd",
            "umd",
            "umd2",
            "jsonp"
          ]
        },
        "libraryExport": {
          "description": "Specify which export should be exposed as library",
          "anyOf": [
            {
              "type": "string"
            },
            {
              "$ref": "#/definitions/common.arrayOfStringValues"
            }
          ]
        },
        "path": {
          "description": "The output directory as **absolute path** (required).",
          "type": "string",
          "absolutePath": true
        },
        "pathinfo": {
          "description": "Include comments with information about the modules.",
          "type": "boolean"
        },
        "publicPath": {
          "description": "The `publicPath` specifies the public URL address of the output files when referenced in a browser.",
          "anyOf": [
            {
              "type": "string"
            },
            {
              "instanceof": "Function"
            }
          ]
        },
        "sourceMapFilename": {
          "description": "The filename of the SourceMaps for the JavaScript files. They are inside the `output.path` directory.",
          "type": "string",
          "absolutePath": false
        },
        "sourcePrefix": {
          "description": "Prefixes every line of the source in the bundle with this string.",
          "type": "string"
        },
        "strictModuleExceptionHandling": {
          "description": "Handles exceptions in module loading correctly at a performance cost.",
          "type": "boolean"
        },
        "umdNamedDefine": {
          "description": "If `output.libraryTarget` is set to umd and `output.library` is set, setting this to true will name the AMD module.",
          "type": "boolean"
        }
      },
      "type": "object"
    },
    "resolve": {
      "additionalProperties": false,
      "properties": {
        "alias": {
          "description": "Redirect module requests",
          "anyOf": [
            {
              "additionalProperties": {
                "description": "New request",
                "type": "string"
              },
              "type": "object"
            },
            {
              "items": {
                "description": "Alias configuration",
                "additionalProperties": false,
                "properties": {
                  "alias": {
                    "description": "New request",
                    "type": "string"
                  },
                  "name": {
                    "description": "Request to be redirected",
                    "type": "string"
                  },
                  "onlyModule": {
                    "description": "Redirect only exact matching request",
                    "type": "boolean"
                  }
                },
                "type": "object"
              },
              "type": "array"
            }
          ]
        },
        "aliasFields": {
          "description": "Fields in the description file (package.json) which are used to redirect requests inside the module",
          "anyOf": [
            {
              "$ref": "#/definitions/common.arrayOfStringOrStringArrayValues"
            }
          ]
        },
        "cachePredicate": {
          "description": "Predicate function to decide which requests should be cached",
          "instanceof": "Function"
        },
        "cacheWithContext": {
          "description": "Include the context information in the cache identifier when caching",
          "type": "boolean"
        },
        "descriptionFiles": {
          "description": "Filenames used to find a description file",
          "anyOf": [
            {
              "$ref": "#/definitions/common.arrayOfStringValues"
            }
          ]
        },
        "enforceExtension": {
          "description": "Enforce using one of the extensions from the extensions option",
          "type": "boolean"
        },
        "enforceModuleExtension": {
          "description": "Enforce using one of the module extensions from the moduleExtensions option",
          "type": "boolean"
        },
        "extensions": {
          "description": "Extensions added to the request when trying to find the file",
          "anyOf": [
            {
              "$ref": "#/definitions/common.arrayOfStringValues"
            }
          ]
        },
        "fileSystem": {
          "description": "Filesystem for the resolver"
        },
        "mainFields": {
          "description": "Field names from the description file (package.json) which are used to find the default entry point",
          "anyOf": [
            {
              "$ref": "#/definitions/common.arrayOfStringOrStringArrayValues"
            }
          ]
        },
        "mainFiles": {
          "description": "Filenames used to find the default entry point if there is no description file or main field",
          "anyOf": [
            {
              "$ref": "#/definitions/common.arrayOfStringValues"
            }
          ]
        },
        "moduleExtensions": {
          "description": "Extenstions added to the module request when trying to find the module",
          "anyOf": [
            {
              "$ref": "#/definitions/common.arrayOfStringValues"
            }
          ]
        },
        "modules": {
          "description": "Folder names or directory paths where to find modules",
          "anyOf": [
            {
              "$ref": "#/definitions/common.arrayOfStringValues"
            }
          ]
        },
        "plugins": {
          "description": "Plugins for the resolver",
          "type": "array"
        },
        "resolver": {
          "description": "Custom resolver"
        },
        "symlinks": {
          "description": "Enable resolving symlinks to the original location",
          "type": "boolean"
        },
        "unsafeCache": {
          "description": "Enable caching of successfully resolved requests",
          "anyOf": [
            {
              "type": "boolean"
            },
            {
              "additionalProperties": true,
              "type": "object"
            }
          ]
        },
        "useSyncFileSystemCalls": {
          "description": "Use synchronous filesystem calls for the resolver",
          "type": "boolean"
        }
      },
      "type": "object"
    },
    "ruleSet-condition": {
      "anyOf": [
        {
          "instanceof": "RegExp"
        },
        {
          "minLength": 1,
          "type": "string"
        },
        {
          "instanceof": "Function"
        },
        {
          "$ref": "#/definitions/ruleSet-conditions"
        },
        {
          "additionalProperties": false,
          "properties": {
            "and": {
              "description": "Logical AND",
              "anyOf": [
                {
                  "$ref": "#/definitions/ruleSet-conditions"
                }
              ]
            },
            "exclude": {
              "description": "Exclude all modules matching any of these conditions",
              "anyOf": [
                {
                  "$ref": "#/definitions/ruleSet-condition"
                }
              ]
            },
            "include": {
              "description": "Exclude all modules matching not any of these conditions",
              "anyOf": [
                {
                  "$ref": "#/definitions/ruleSet-condition"
                }
              ]
            },
            "not": {
              "description": "Logical NOT",
              "anyOf": [
                {
                  "$ref": "#/definitions/ruleSet-conditions"
                }
              ]
            },
            "or": {
              "description": "Logical OR",
              "anyOf": [
                {
                  "$ref": "#/definitions/ruleSet-conditions"
                }
              ]
            },
            "test": {
              "description": "Exclude all modules matching any of these conditions",
              "anyOf": [
                {
                  "$ref": "#/definitions/ruleSet-condition"
                }
              ]
            }
          },
          "type": "object"
        }
      ]
    },
    "ruleSet-conditions": {
      "items": {
        "description": "A rule condition",
        "anyOf": [
          {
            "$ref": "#/definitions/ruleSet-condition"
          }
        ]
      },
      "type": "array"
    },
    "ruleSet-loader": {
      "minLength": 1,
      "type": "string"
    },
    "ruleSet-query": {
      "anyOf": [
        {
          "type": "object"
        },
        {
          "type": "string"
        }
      ]
    },
    "ruleSet-rule": {
      "additionalProperties": false,
      "properties": {
        "enforce": {
          "description": "Enforce this rule as pre or post step",
          "enum": [
            "pre",
            "post"
          ]
        },
        "exclude": {
          "description": "Shortcut for resource.exclude",
          "allOf": [
            {
              "$ref": "#/definitions/ruleSet-condition"
            },
            {
              "absolutePath": true
            }
          ]
        },
        "include": {
          "description": "Shortcut for resource.include",
          "allOf": [
            {
              "$ref": "#/definitions/ruleSet-condition"
            },
            {
              "absolutePath": true
            }
          ]
        },
        "issuer": {
          "description": "Match the issuer of the module (The module pointing to this module)",
          "allOf": [
            {
              "$ref": "#/definitions/ruleSet-condition"
            },
            {
              "absolutePath": true
            }
          ]
        },
        "loader": {
          "description": "Shortcut for use.loader",
          "anyOf": [
            {
              "$ref": "#/definitions/ruleSet-loader"
            },
            {
              "$ref": "#/definitions/ruleSet-use"
            }
          ]
        },
        "loaders": {
          "description": "Shortcut for use.loader",
          "anyOf": [
            {
              "$ref": "#/definitions/ruleSet-use"
            }
          ]
        },
        "oneOf": {
          "description": "Only execute the first matching rule in this array",
          "anyOf": [
            {
              "$ref": "#/definitions/ruleSet-rules"
            }
          ]
        },
        "options": {
          "description": "Shortcut for use.options",
          "anyOf": [
            {
              "$ref": "#/definitions/ruleSet-query"
            }
          ]
        },
        "parser": {
          "description": "Options for parsing",
          "additionalProperties": true,
          "type": "object"
        },
        "query": {
          "description": "Shortcut for use.query",
          "anyOf": [
            {
              "$ref": "#/definitions/ruleSet-query"
            }
          ]
        },
        "resource": {
          "description": "Match the resource path of the module",
          "allOf": [
            {
              "$ref": "#/definitions/ruleSet-condition"
            },
            {
              "absolutePath": true
            }
          ]
        },
        "resourceQuery": {
          "description": "Match the resource query of the module",
          "anyOf": [
            {
              "$ref": "#/definitions/ruleSet-condition"
            }
          ]
        },
        "compiler": {
          "description": "Match the child compiler name",
          "anyOf": [
            {
              "$ref": "#/definitions/ruleSet-condition"
            }
          ]
        },
        "rules": {
          "description": "Match and execute these rules when this rule is matched",
          "anyOf": [
            {
              "$ref": "#/definitions/ruleSet-rules"
            }
          ]
        },
        "test": {
          "description": "Shortcut for resource.test",
          "allOf": [
            {
              "$ref": "#/definitions/ruleSet-condition"
            },
            {
              "absolutePath": true
            }
          ]
        },
        "use": {
          "description": "Modifiers applied to the module when rule is matched",
          "anyOf": [
            {
              "$ref": "#/definitions/ruleSet-use"
            }
          ]
        }
      },
      "type": "object"
    },
    "ruleSet-rules": {
      "items": {
        "description": "A rule",
        "anyOf": [
          {
            "$ref": "#/definitions/ruleSet-rule"
          }
        ]
      },
      "type": "array"
    },
    "ruleSet-use": {
      "anyOf": [
        {
          "$ref": "#/definitions/ruleSet-use-item"
        },
        {
          "instanceof": "Function"
        },
        {
          "items": {
            "description": "An use item",
            "anyOf": [
              {
                "$ref": "#/definitions/ruleSet-use-item"
              }
            ]
          },
          "type": "array"
        }
      ]
    },
    "ruleSet-use-item": {
      "anyOf": [
        {
          "$ref": "#/definitions/ruleSet-loader"
        },
        {
          "instanceof": "Function"
        },
        {
          "additionalProperties": false,
          "properties": {
            "loader": {
              "description": "Loader name",
              "anyOf": [
                {
                  "$ref": "#/definitions/ruleSet-loader"
                }
              ]
            },
            "options": {
              "description": "Loader options",
              "anyOf": [
                {
                  "$ref": "#/definitions/ruleSet-query"
                }
              ]
            },
            "ident": {
              "description": "Unique loader identifier",
              "type": "string"
            },
            "query": {
              "description": "Loader query",
              "anyOf": [
                {
                  "$ref": "#/definitions/ruleSet-query"
                }
              ]
            }
          },
          "type": "object"
        }
      ]
    },
    "filter-item-types": {
      "anyOf": [
        {
          "instanceof": "RegExp"
        },
        {
          "type": "string"
        },
        {
          "instanceof": "Function"
        }
      ]
    },
    "filter-types": {
      "anyOf": [
        {
          "$ref": "#/definitions/filter-item-types"
        },
        {
          "type": "array",
          "items": {
            "description": "Rule to filter",
            "anyOf": [
              {
                "$ref": "#/definitions/filter-item-types"
              }
            ]
          }
        }
      ]
    }
  },
  "properties": {
    "amd": {
      "description": "Set the value of `require.amd` and `define.amd`."
    },
    "bail": {
      "description": "Report the first error as a hard error instead of tolerating it.",
      "type": "boolean"
    },
    "cache": {
      "description": "Cache generated modules and chunks to improve performance for multiple incremental builds.",
      "anyOf": [
        {
          "description": "You can pass `false` to disable it.",
          "type": "boolean"
        },
        {
          "description": "You can pass an object to enable it and let webpack use the passed object as cache. This way you can share the cache object between multiple compiler calls.",
          "type": "object"
        }
      ]
    },
    "context": {
      "description": "The base directory (absolute path!) for resolving the `entry` option. If `output.pathinfo` is set, the included pathinfo is shortened to this directory.",
      "type": "string",
      "absolutePath": true
    },
    "dependencies": {
      "description": "References to other configurations to depend on.",
      "items": {
        "description": "References to another configuration to depend on.",
        "type": "string"
      },
      "type": "array"
    },
    "devServer": {
      "description": "Options for the webpack-dev-server",
      "type": "object"
    },

    // sourcemap/source-map hidden inline eval cheap module nosources @ #
    "devtool": {
      "description": "A developer tool to enhance debugging.",
      "anyOf": [
        {
          "type": "string"
        },
        {
          "enum": [
            false
          ]
        }
      ]
    },

    "entry": {
      "description": "The entry point(s) of the compilation.",
      "anyOf": [
        {
          "$ref": "#/definitions/entry"
        }
      ]
    },
    "externals": {
      "description": "Specify dependencies that shouldn't be resolved by webpack, but should become dependencies of the resulting bundle. The kind of the dependency depends on `output.libraryTarget`.",
      "anyOf": [
        {
          "$ref": "#/definitions/externals"
        }
      ]
    },
    "loader": {
      "description": "Custom values available in the loader context.",
      "type": "object"
    },
    "module": {
      "description": "Options affecting the normal modules (`NormalModuleFactory`).",
      "anyOf": [
        {
          "$ref": "#/definitions/module"
        }
      ]
    },
    "name": {
      "description": "Name of the configuration. Used when loading multiple configurations.",
      "type": "string"
    },
    "node": {
      "description": "Include polyfills or mocks for various node stuff.",
      "anyOf": [
        {
          "enum": [
            false
          ]
        },
        {
          "additionalProperties": {
            "description": "Include a polyfill for the node.js module",
            "enum": [
              false,
              true,
              "mock",
              "empty"
            ]
          },
          "properties": {
            "Buffer": {
              "description": "Include a polyfill for the 'Buffer' variable",
              "enum": [
                false,
                true,
                "mock"
              ]
            },
            "__dirname": {
              "description": "Include a polyfill for the '__dirname' variable",
              "enum": [
                false,
                true,
                "mock"
              ]
            },
            "__filename": {
              "description": "Include a polyfill for the '__filename' variable",
              "enum": [
                false,
                true,
                "mock"
              ]
            },
            "console": {
              "description": "Include a polyfill for the 'console' variable",
              "enum": [
                false,
                true,
                "mock"
              ]
            },
            "global": {
              "description": "Include a polyfill for the 'global' variable",
              "type": "boolean"
            },
            "process": {
              "description": "Include a polyfill for the 'process' variable",
              "enum": [
                false,
                true,
                "mock"
              ]
            }
          },
          "type": "object"
        }
      ]
    },
    "output": {
      "description": "Options affecting the output of the compilation. `output` options tell webpack how to write the compiled files to disk.",
      "anyOf": [
        {
          "$ref": "#/definitions/output"
        }
      ]
    },
    "parallelism": {
      "description": "The number of parallel processed modules in the compilation.",
      "minimum": 1,
      "type": "number"
    },
    "performance": {
      "description": "Configuration for web performance recommendations.",
      "anyOf": [
        {
          "enum": [
            false
          ]
        },
        {
          "additionalProperties": false,
          "properties": {
            "assetFilter": {
              "description": "Filter function to select assets that are checked",
              "instanceof": "Function"
            },
            "hints": {
              "description": "Sets the format of the hints: warnings, errors or nothing at all",
              "enum": [
                false,
                "warning",
                "error"
              ]
            },
            "maxEntrypointSize": {
              "description": "Total size of an entry point (in bytes)",
              "type": "number"
            },
            "maxAssetSize": {
              "description": "Filesize limit (in bytes) when exceeded, that webpack will provide performance hints",
              "type": "number"
            }
          },
          "type": "object"
        }
      ]
    },
    "plugins": {
      "description": "Add additional plugins to the compiler.",
      "type": "array"
    },
    "profile": {
      "description": "Capture timing information for each module.",
      "type": "boolean"
    },

    // record: ‘compiler state’ 以json文件的格式保存
    "recordsInputPath": {
      "description": "Store compiler state to a json file.",
      "type": "string",
      "absolutePath": true
    },
    "recordsOutputPath": {
      "description": "Load compiler state from a json file.",
      "type": "string",
      "absolutePath": true
    },
    "recordsPath": {
      "description": "Store/Load compiler state from/to a json file. This will result in persistent ids of modules and chunks. An absolute path is expected. `recordsPath` is used for `recordsInputPath` and `recordsOutputPath` if they left undefined.",
      "type": "string",
      "absolutePath": true
    },

    "resolve": {
      "description": "Options for the resolver",
      "anyOf": [
        {
          "$ref": "#/definitions/resolve"
        }
      ]
    },
    "resolveLoader": {
      "description": "Options for the resolver when resolving loaders",
      "anyOf": [
        {
          "$ref": "#/definitions/resolve"
        }
      ]
    },
    "stats": {
      "description": "Used by the webpack CLI program to pass stats options.",
      "anyOf": [
        {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "all": {
              "type": "boolean",
              "description": "fallback value for stats options when an option is not defined (has precedence over local webpack defaults)"
            },
            "context": {
              "type": "string",
              "description": "context directory for request shortening",
              "absolutePath": true
            },
            "hash": {
              "type": "boolean",
              "description": "add the hash of the compilation"
            },
            "version": {
              "type": "boolean",
              "description": "add webpack version information"
            },
            "timings": {
              "type": "boolean",
              "description": "add timing information"
            },
            "performance": {
              "type": "boolean",
              "description": "add performance hint flags"
            },
            "depth": {
              "type": "boolean",
              "description": "add module depth in module graph"
            },
            "assets": {
              "type": "boolean",
              "description": "add assets information"
            },
            "env": {
              "type": "boolean",
              "description": "add --env information"
            },
            "colors": {
              "description": "Enables/Disables colorful output",
              "oneOf": [
                {
                  "type": "boolean",
                  "description": "`webpack --colors` equivalent"
                },
                {
                  "type": "object",
                  "additionalProperties": false,
                  "properties": {
                    "bold": {
                      "description": "Custom color for bold text",
                      "type": "string"
                    },
                    "red": {
                      "description": "Custom color for red text",
                      "type": "string"
                    },
                    "green": {
                      "description": "Custom color for green text",
                      "type": "string"
                    },
                    "cyan": {
                      "description": "Custom color for cyan text",
                      "type": "string"
                    },
                    "magenta": {
                      "description": "Custom color for magenta text",
                      "type": "string"
                    },
                    "yellow": {
                      "description": "Custom color for yellow text",
                      "type": "string"
                    }
                  }
                }
              ]
            },
            "maxModules": {
              "type": "number",
              "description": "Set the maximum number of modules to be shown"
            },
            "chunks": {
              "type": "boolean",
              "description": "add chunk information"
            },
            "chunkModules": {
              "type": "boolean",
              "description": "add built modules information to chunk information"
            },
            "modules": {
              "type": "boolean",
              "description": "add built modules information"
            },
            "children": {
              "type": "boolean",
              "description": "add children information"
            },
            "cached": {
              "type": "boolean",
              "description": "add also information about cached (not built) modules"
            },
            "cachedAssets": {
              "type": "boolean",
              "description": "Show cached assets (setting this to `false` only shows emitted files)"
            },
            "reasons": {
              "type": "boolean",
              "description": "add information about the reasons why modules are included"
            },
            "source": {
              "type": "boolean",
              "description": "add the source code of modules"
            },
            "warnings": {
              "type": "boolean",
              "description": "add warnings"
            },
            "errors": {
              "type": "boolean",
              "description": "add errors"
            },
            "warningsFilter": {
              "description": "Suppress warnings that match the specified filters. Filters can be Strings, RegExps or Functions",
              "anyOf": [
                {
                  "$ref": "#/definitions/filter-types"
                }
              ]
            },
            "excludeAssets": {
              "description": "Suppress assets that match the specified filters. Filters can be Strings, RegExps or Functions",
              "anyOf": [
                {
                  "$ref": "#/definitions/filter-types"
                }
              ]
            },
            "excludeModules": {
              "description": "Suppress modules that match the specified filters. Filters can be Strings, RegExps or Functions",
              "anyOf": [
                {
                  "$ref": "#/definitions/filter-types"
                }
              ]
            },
            "exclude": {
              "description": "Please use excludeModules instead.",
              "anyOf": [
                {
                  "$ref": "#/definitions/filter-types"
                }
              ]
            },
            "entrypoints": {
              "type": "boolean",
              "description": "Display the entry points with the corresponding bundles"
            },
            "errorDetails": {
              "type": "boolean",
              "description": "add details to errors (like resolving log)"
            },
            "chunkOrigins": {
              "type": "boolean",
              "description": "add the origins of chunks and chunk merging info"
            },
            "modulesSort": {
              "type": "string",
              "description": "sort the modules by that field"
            },
            "moduleTrace": {
              "type": "boolean",
              "description": "add dependencies and origin of warnings/errors"
            },
            "chunksSort": {
              "type": "string",
              "description": "sort the chunks by that field"
            },
            "assetsSort": {
              "type": "string",
              "description": "sort the assets by that field"
            },
            "publicPath": {
              "type": "boolean",
              "description": "Add public path information"
            },
            "providedExports": {
              "type": "boolean",
              "description": "show exports provided by modules"
            },
            "usedExports": {
              "type": "boolean",
              "description": "show exports used by modules"
            },
            "optimizationBailout": {
              "type": "boolean",
              "description": "show reasons why optimization bailed out for modules"
            }
          }
        },
        {
          "type": "boolean"
        },
        {
          "enum": [
            "none",
            "errors-only",
            "minimal",
            "normal",
            "detailed",
            "verbose"
          ]
        }
      ]
    },
    "target": {
      "description": "Environment to build for",
      "anyOf": [
        {
          "enum": [
            "web",
            "webworker",
            "node",
            "async-node",
            "node-webkit",
            "atom",
            "electron",
            "electron-main",
            "electron-renderer"
          ]
        },
        {
          "instanceof": "Function"
        }
      ]
    },
    "watch": {
      "description": "Enter watch mode, which rebuilds on file change.",
      "type": "boolean"
    },
    "watchOptions": {
      "description": "Options for the watcher",
      "additionalProperties": false,
      "properties": {
        "aggregateTimeout": {
          "description": "Delay the rebuilt after the first change. Value is a time in ms.",
          "type": "number"
        },
        "ignored": {
          "description": "Ignore some files from watching"
        },
        "stdin": {
          "description": "Stop watching when stdin stream has ended",
          "type": "boolean"
        },
        "poll": {
          "description": "Enable polling mode for watching",
          "anyOf": [
            {
              "description": "`true`: use polling.",
              "type": "boolean"
            },
            {
              "description": "`number`: use polling with specified interval.",
              "type": "number"
            }
          ]
        }
      },
      "type": "object"
    }
  },
  "required": [
    "entry"
  ],
  "type": "object"
}
