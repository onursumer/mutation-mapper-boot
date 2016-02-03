package org.cbioportal.mutation_mapper_boot;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController // shorthand for @Controller, @ResponseBody
@RequestMapping(value = "/")
public class ProxyController
{
    @RequestMapping(value = "variant_annotation/hgvs/{variants:.+}",
        method = {RequestMethod.GET, RequestMethod.POST},
        produces = "application/json")
    public String getVariantAnnotation(@PathVariable String variants)
    {
        String uri = "http://localhost:38080/variant_annotation/hgvs/" + variants;

        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(uri, String.class);
    }

    @RequestMapping(value = "variant_annotation/hgvs",
        method = {RequestMethod.POST},
        produces = "application/json")
    public String getVariantAnnotationPost(@RequestBody String variants)
    {
        String uri = "http://localhost:38080/variant_annotation/hgvs/" + variants;

        // TODO postForObject
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(uri, String.class);
    }

    @RequestMapping(value = "pdb",
        method = {RequestMethod.POST, RequestMethod.GET},
        produces = "application/json")
    public String getPdbData(@RequestBody String body)
    {
        String uri = "http://www.cbioportal.org/get3dPdb.json?" + body;

        // TODO postForObject? -- position mapping does not work!
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(uri, String.class);
    }

    @RequestMapping(value = "pfam",
        method = {RequestMethod.POST, RequestMethod.GET},
        produces = "application/json")
    public String getPfamData(@RequestBody String body)
    {
        String uri = "http://www.cbioportal.org/getPfamSequence.json?" + body;

        // TODO postForObject?
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(uri, String.class);
    }
}
