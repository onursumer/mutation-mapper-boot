// TODO need to init 3D visualizer before document gets ready due to JSmol bug
//var _mut3dVis = null;
//_mut3dVis = new Mutation3dVis("default3dView", {
//	appOptions: {j2sPath: "../lib/jsmol/j2s"},
//	frame: "../build/jsmol_frame.html"
//});
//_mut3dVis.init();


// Set up Mutation View
$(document).ready(function() {
	$("body").append(window["backbone-template"]["mutationViews"]);

	function processInput(input)
	{
		//var sampleArray = PortalGlobals.getCases().trim().split(/\s+/);
		var parser = new MutationInputParser();

		// parse the provided input string
		var mutationData = parser.parseInput(input);

		var sampleArray = parser.getSampleArray();

		var geneList = parser.getGeneList();

		// No data to visualize...
		if (geneList.length == 0)
		{
			$("#mutation_details").html(
				"No data to visualize. Please make sure your input format is valid.");

			return;
		}

		// customized table options
		var tableOpts = {
			columnVisibility: {
				startPos: function (util, gene) {
					if (util.containsStartPos(gene)) {
						return "visible";
					}
					else {
						return "hidden";
					}
				},
				endPos: function (util, gene) {
					if (util.containsEndPos(gene)) {
						return "visible";
					}
					else {
						return "hidden";
					}
				},
				variantAllele: function (util, gene) {
					if (util.containsVarAllele(gene)) {
						return "visible";
					}
					else {
						return "hidden";
					}
				},
				referenceAllele: function (util, gene) {
					if (util.containsRefAllele(gene)) {
						return "visible";
					}
					else {
						return "hidden";
					}
				},
				chr: function (util, gene) {
					if (util.containsChr(gene)) {
						return "visible";
					}
					else {
						return "hidden";
					}
				}
			},
			columnRender: {
				caseId: function(datum) {
					var mutation = datum.mutation;
					var caseIdFormat = MutationDetailsTableFormatter.getCaseId(mutation.get("caseId"));
					var vars = {};
					vars.linkToPatientView = mutation.get("linkToPatientView");
					vars.caseId = caseIdFormat.text;
					vars.caseIdClass = caseIdFormat.style;
					vars.caseIdTip = caseIdFormat.tip;

					var templateFn;

					if (mutation.get("linkToPatientView"))
					{
						templateFn = BackboneTemplateCache.getTemplateFn("mutation_table_case_id_template");
					}
					else
					{
						templateFn = BackboneTemplateCache.getTemplateFn("custom_mutation_case_id_template");
					}

					return templateFn(vars);
				}
			}
		};

		// customized main mapper options
		var options = {
			el: "#mutation_details",
			data: {
				geneList: geneList,
				sampleList: sampleArray
			},
			proxy: {
				mutationProxy: {
					options: {
						initMode: "full",
						data: mutationData
					}
				},
				pfamProxy: {
					options: {
                        servletName: "/pfam",
						initMode: "lazy",
						data: TestData.getPfamData()
					}
				},
				pdbProxy: {
					options: {
                        servletName: "/pdb",
						initMode: "lazy",
						data: TestData.getPdbData()
					}
				},
				variantAnnotationProxy: {
					options: {
						initMode: "lazy",
						data: TestData.getAnnotationData()
					}
				},
				mutationAlignerProxy: {
					options: {
						initMode: "full",
						data: TestData.getMutationAlignerData()
					}
				}
				// TODO implement full init for pancan & portal
				//pancanProxy: {
				//	options: {
				//		initMode: "full",
				//		data: TestData.getPancanData()
				//	}
				//},
				//portalProxy: {
				//	options: {
				//		initMode: "full",
				//		data: TestData.getPortalData()
				//	}
				//}
			},
			view: {
				mutationTable: tableOpts
			}
		};

		// init mutation mapper
		var mutationMapper = new MutationMapper(options);
		mutationMapper.init();
	}

	$(".visualize").click(function(evt){
		processInput($("#mutation_file_example").val());
	});

	processInput($("#mutation_file_example").val());
});
