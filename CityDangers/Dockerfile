# https://hub.docker.com/_/microsoft-dotnet
FROM mcr.microsoft.com/dotnet/aspnet:5.0-focal AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:5.0.103 AS build
WORKDIR /src


RUN curl -sL https://deb.nodesource.com/setup_16.x |  bash -
RUN apt-get install -y nodejs

COPY ./ClientApp/package*.json .
RUN npm install
RUN npm i react-bootstrap

# copy csproj and restore as distinct layers
COPY ./*.csproj .
RUN dotnet restore


# copy everything else and build app
COPY . .
WORKDIR /src

RUN dotnet build "CityDangers.csproj" -c Release -o /app/build
FROM build AS publish

RUN dotnet publish "CityDangers.csproj" -c Release -o /app/publish
FROM base AS final

# final stage/image
WORKDIR /app
COPY --from=publish /app/publish .

ENTRYPOINT ["dotnet", "CityDangers.dll"]