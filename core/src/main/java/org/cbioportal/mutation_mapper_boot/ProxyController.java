package org.cbioportal.mutation_mapper_boot;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController // shorthand for @Controller, @ResponseBody
@RequestMapping(value = "/variant_annotation/")
public class ProxyController
{
    @RequestMapping(value = "/hgvs/{variants:.+}",
        method = {RequestMethod.GET, RequestMethod.POST},
        produces = "application/json")
    public String getVariantAnnotation(@PathVariable String variants)
    {
        String uri = "http://localhost:38080/variant_annotation/hgvs/" + variants;

        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(uri, String.class);
    }

    @RequestMapping(value = "/hgvs",
        method = {RequestMethod.POST},
        produces = "application/json")
    public String getVariantAnnotationPost(@RequestBody String variants)
    {
        String uri = "http://localhost:38080/variant_annotation/hgvs/" + variants;

        // TODO postForObject
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(uri, String.class);
    }
}
